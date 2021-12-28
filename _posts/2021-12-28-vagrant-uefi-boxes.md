---
layout: post
title: "Working with Vagrant UEFI boxes (LibVirt)"
slug: vagrant-uefi-boxes
category: vagrant,virtualization,libvirt
---

This blog post will be about Vagrant, UEFI and LibVirt, although we won't go
into too much detail about how these technologies work, but instead it will be a
kind of 'tutorial' on how to prepare a newly created VM with UEFI to be
converted to Vagrant Box format.

In the future, I hope to have more content related to this as I plan to write
more about VMs and Vagrant at the rate I'm learning these new technologies.

---
{: data-content="backstory"}

For starters, this post came from the need that my current team had in relation
to vagrant boxes. We use vagrant for our internal development workflow, more
specifically we use public machines like CentOS[^1] and Oracle Linux[^2],
however these box providers were only available with BIOS features, not UEFI.

The product I work[^3] is related to OS conversion, more specifically,
converting CentOS and Oracle Linux systems to RHEL
(If you're interested, check out the README.md[^3] in our repository), and
recently we released a feature that allows converting machines that use UEFI,
previously this was not possible.

But enough of that! Let's go to the necessary reading, how to create a vagrant
box with UEFI :)

---

# Preparing the environment to work with

If you want to follow this post and want to follow everything that will be done
in it, you will first need to install some additional programs on your machine.

Required programs:

* QEMU/KVM
* VirtManager (Or virsh if you are comfortable with command line apps)
* Vagrant
* [Vagrant LibVirt Provider](https://github.com/vagrant-libvirt/vagrant-libvirt/)
* CentOS 8 ISO[^4] (You can use any other ISO if you want to)

# Setup VM in VirtManager

To create a new VM, we will use VirtManager as it is easier and quicker to
understand, if you don't know how the process of creating a VM through
VirtManager is, please take a look at this OSTechNix tutorial[^5] or this blog
post from Leyhline[^6] with more in depth information.

Just pay attention to the final step. Instead of completing the VM creation,
follow the screenshots below to select the firmware as UEFI.

Toggle the "Customize configuration before install" check to select the UEFI
firmware correctly.

{% include zoom_img.html alt="Customize configuration before install."
src="https://i.imgur.com/74TjFKW.png" %}

Here's where you need to select the firmware for the newly created VM. Select
the UEFI (not the secboot one, if it's available)

{% include zoom_img.html alt="Selecting UEFI firmware before install."
src="https://i.imgur.com/Lwqw8Th.png" %}

I recommend that you opt for a minimal installation in the VM so as not to
create unnecessary dependency overhead. Furthermore, the objective of using
vagrant as a development environment is precisely to have an environment that is
facially recreatable and capable of installing packages whenever you need it.

If you are unsure how to proceed with your VM installation, follow the tutorial
made by Leyhline[^6]! The information contained there is very useful and
self-explanatory and will help in this initial setup.

---

# Setup the newly created VM

We can begin with a simple `echo "Hello World"` to validate that our VM is
responding correctly as the image shows below.

{% include zoom_img.html alt="A simple hello world :)"
src="https://i.imgur.com/wbr3j79.png" %}

First, let's connect via SSH to our machine to make it easier to run some
commands.

To do this, inside your machine, use the command `ip addr show`, generally, in
this type of installation the network interface we are looking for is `enp1s0`

{% include zoom_img.html alt="Get the ip addres to connect over SSH"
src="https://i.imgur.com/0M4NRH8.png" %}

Once inside the machine connected with SSH, we will start installing some
necessary packages and modifying some settings. For that, we'll use some
commands that are already well positioned in a helper script promoted by the
folks at vagrant-libvirt[^7]. Keep in mind that, not all the commands presented
in this script will be useful for our case, so I will link the script for
reference and we will use a few commands to create our machine.

Below you can find the commands in a minimalist way, only that is needed for
your machine setup. If you want, you can install additional packages depending
on your usage and if you find it necessary!

```
# Update the whole system to be at the latest version of all packages
yum update -y

# Install some packages (This can be edited before running the script to your
desire)
yum install openssh-server openssh-clients rsync -y

# Create the vagrant user and set the password for both root and vagrant to
`vagrant`.
# Do this if you missed this step in the install process.
useradd vagrant
echo 'vagrant' | passwd --stdin vagrant
echo 'vagrant' | passwd --stdin root

# Add permissions to sudoers
echo 'vagrant ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/vagrant
echo 'Defaults    env_keep += "SSH_AUTH_SOCK"' >> /etc/sudoers
sed -i 's/Defaults\s*requiretty/Defaults !requiretty/' /etc/sudoers

# SSH setup
# Disable DNS for ssh lookups as this is really slow
sed -i 's/.*UseDNS.*/UseDNS no/' /etc/ssh/sshd_config

# Restart SSHD service
systemctl restart sshd

# Where the `X` is a number depending on your setup (usually it will be `eth0`
and `ens3`)
# For CentOS/OL 7
echo 'NM_CONTROLLED="no"' >> /etc/sysconfig/network-scripts/ifcfg-ethX

# For CentOS/OL 8
echo "NM_CONTROLLED=no" >> /etc/sysconfig/network-scripts/ifcfg-ensX

# Cleanup
yum clean all
rm -f /root/.bash_history
rm -f /home/vagrant/.bash_history
```

For reference, this is the original script[^8] made by the
vagrant-libvirt folks[^7].

Now that we have everything right in our machine, let's add the vagrant insecure
public key[^9], so we can access the machine with SSH support. You can add your
own SSH key, but for this post, we're going to focus on using Vagrant's default
key rather than a custom one.

The simplest method of performing this procedure is to follow the instructions
provided in the Leyhline post[^10]. You can also perform this procedure
manually, as I'll show you, but keep in mind that I'll recommend the same method
used in the Leyhline[^10] post.

Alternative method:

```
# Create the .ssh directory for vagrant
mkdir -p /home/vagrant/.ssh

# Download the vagrant public key in your VM
curl https://raw.githubusercontent.com/hashicorp/vagrant/main/keys/vagrant.pub \
> /home/vagrant/.ssh/authorized_keys

# Change permissions for folder and file
chmod 700 /home/vagrant/.ssh
chmod 600 /home/vagrant/.ssh/authorized_keys
```

Now everything is set up correctly! You can turn off the machine as you please.
In our next step we will generate a box through this machine that we have just
configured.

# Packaging the VM into a Vagrant Box

Turning your VM into a Vagrant Box is extremely easy, for that we'll use another
script[^11] (this time in its completeness), which was created by the folks at
vagrant-libvirt[^7]. This script will take your VM created in `.qcow2` format
and turn it into a vagrant box with `.box` format.

Just follow the commands below and the script will automatically generate a box
for you :)

```
# Download the script from the vagrant-libvirt repository
curl -o create_box.sh https://raw.githubusercontent.com/vagrant-libvirt/vagrant-libvirt/master/tools/create_box.sh

# Give executable permissions
chmod u+x create_box.sh

# Execute the script.
# We have to execute it as root/sudo.
# You have to change the path to the VM image accordingly with your libvirt pool
# location. For me, it was in this default directory.
sudo ./create_box.sh /var/lib/libvirt/images/pool/centos8-uefi.qcow2
```

Output of the `create_box.sh` script:

{% include zoom_img.html alt="create_box.sh output"
src="https://i.imgur.com/JV5rOfW.png" %}

---

# Testing our newly created Vagrant Box

In order to be able to test the new box locally, we will need to add it to the
Vagrant registry, thus making the box "visible" and usable (Don't worry, this is
a local procedure, you are not uploading anything to the vagrant cloud). This
process is very simple, just see the commands below and run them where you ran
the previous commands (`create_box.sh ...`)

```
# Add the box to the Vagrant registry.
# You have to be on the same directory that you generated the `centos-uefi.box`
# file.
vagrant box add centos8-uefi.box --name centos8-uefi

# Create another directory for the `Vagrantfile` we will work with
mkdir vagrant_test_uefi
cd vagrant_test_uefi

# Initialize the vagrant with your box
vagrant init centos8-uefi
```

Now that you've added your new box to the Vagrant registry and initialized
`Vagrantfile`, we can start some necessary tweaks.

Open the `Vagrantfile` with your favorite text editor and add the following
lines after the `16` line.

```
# Rest of the Vagrantfile
...

# Disable default nfs sync
config.vm.synced_folder ".", "/vagrant", disabled: true

# Add configuration for libvirt
config.vm.provider :libvirt do |libvirt|
    libvirt.memory = 1024
    libvirt.cpus = 1
    libvirt.cpu_mode = "host-passthrough"

    # This was taken from the VirtManager info abou the VM, but it is pretty
    # much default for every UEFI box with Vagrant.
    libvirt.loader = "/usr/share/edk2/ovmf/OVMF_CODE.fd"
end

# Rest of the Vagrantfile
...
```

Save the modified content and we're ready to run the new box!

{% include zoom_img.html alt="Output of vagrant up to show that the box really
works!" src="https://i.imgur.com/FK8bdwX.png" %}

Yay! We did it!!! Now you have a fully working and ready to run box with UEFI
right to be used in your development workflow!

If you want to validate that this box is actually running with
UEFI firmware, just run this command inside the box and validate the output.

```
# Validate that the running box is indeed wiht UEFI
efibootmgr -v
```

{% include zoom_img.html alt="Ouptut of the efibootmgr -v command"
src="https://i.imgur.com/WsDJaGi.png" %}

I hope you enjoyed this post and that it was useful and valid for you!

Until the next post :)

Cya~

Rodolfo Olivieri.

---
{: data-content="doubts?"}

{% include doubts.html %}

---
{: data-content="references"}

[^1]: https://app.vagrantup.com/centos
[^2]: https://app.vagrantup.com/eurolinux-vagrant
[^3]: https://github.com/oamg/convert2rhel/
[^4]: http://isoredirect.centos.org/centos/8/isos/x86_64/
[^5]: https://ostechnix.com/how-to-manage-kvm-virtual-machines-with-virt-manager/
[^6]: https://leyhline.github.io/2019/02/16/creating-a-vagrant-base-box/
[^7]: https://github.com/vagrant-libvirt/vagrant-libvirt
[^8]: https://github.com/vagrant-libvirt/vagrant-libvirt/blob/master/tools/prepare_redhat_for_box.sh
[^9]: https://github.com/hashicorp/vagrant/tree/main/keys
[^10]: https://leyhline.github.io/2019/02/16/creating-a-vagrant-base-box/#configure-ssh-access
[^11]: https://github.com/vagrant-libvirt/vagrant-libvirt/blob/master/tools/create_box.sh
