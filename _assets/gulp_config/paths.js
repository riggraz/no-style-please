const paths = {
    // Directory locations.
    assetsDir: "_assets/", // The files Gulp will handle.
    jekyllDir: "", // The files Jekyll will handle.
    jekyllAssetsDir: "assets/", // The asset files Jekyll will handle.
    siteDir: "_site/", // The resulting static site.
    siteAssetsDir: "_site/assets/", // The resulting static site's assets.

    // Folder naming conventions.
    postFolderName: '_posts',
    draftFolderName: '_drafts',
    fontFolderName: 'fonts',
    imageFolderName: 'img',
    scriptFolderName: 'js',
    stylesFolderName: 'css',
    iconsFolderName: 'icons',

    // Glob patterns by file type.
    sassPattern: '/**/*.scss',
    jsPattern: '/**/*.js',
    imagePattern: '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)',
    markdownPattern: '/**/*.+(md|MD|markdown|MARKDOWN)',
    htmlPattern: '/**/*.html',
    xmlPattern: '/**/*.xml',
};

// Asset files globs
paths.sassFiles = paths.assetsDir + paths.stylesFolderName;
paths.jsFiles = paths.assetsDir + paths.scriptFolderName;
paths.imageFiles = paths.assetsDir + paths.imageFolderName;
paths.fontFiles = paths.assetsDir + paths.fontFolderName;
paths.iconFiles = paths.assetsDir + paths.iconsFolderName;

// Jekyll files locations.
paths.jekyllPostFiles = paths.jekyllDir + paths.postFolderName;
paths.jekyllDraftFiles = paths.jekyllDir + paths.draftFolderName;
paths.jekyllCssFiles = paths.jekyllAssetsDir + paths.stylesFolderName;
paths.jekyllJsFiles = paths.jekyllAssetsDir + paths.scriptFolderName;
paths.jekyllImageFiles = paths.jekyllAssetsDir + paths.imageFolderName;
paths.jekyllFontFiles = paths.jekyllAssetsDir + paths.fontFolderName;
paths.jekyllIconFiles = paths.jekyllAssetsDir + paths.iconsFolderName;

// Site files locations.
paths.siteCssFiles = paths.siteAssetsDir + paths.stylesFolderName;
paths.siteJsFiles = paths.siteAssetsDir + paths.scriptFolderName;
paths.siteImageFiles = paths.siteAssetsDir + paths.imageFolderName;
paths.siteFontFiles = paths.siteAssetsDir + paths.fontFolderName;
paths.siteIconFiles = paths.siteAssetsDir + paths.iconsFolderName;

// Asset files globs
paths.sassFilesGlob = paths.sassFiles + paths.sassPattern;
paths.jsFilesGlob = paths.jsFiles + paths.jsPattern;
paths.imageFilesGlob = paths.imageFiles + paths.imagePattern;
paths.iconFilesGlob = paths.iconFiles + paths.imagePattern;

// Jekyll files globs
paths.jekyllPostFilesGlob = paths.jekyllPostFiles + paths.markdownPattern;
paths.jekyllDraftFilesGlob = paths.jekyllDraftFiles + paths.markdownPattern;
paths.jekyllHtmlFilesGlob = paths.jekyllDir + paths.htmlPattern;
paths.jekyllXmlFilesGlob = paths.jekyllDir + paths.xmlPattern;
paths.jekyllImageFilesGlob = paths.jekyllImageFiles + paths.imagePattern;

// Site files globs
paths.siteHtmlFilesGlob = paths.siteDir + paths.htmlPattern;

module.exports = paths;
