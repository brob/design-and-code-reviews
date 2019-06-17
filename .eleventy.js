module.exports = function(config) {
   


    // config.addPassthroughCopy("images");
    // config.addPassthroughCopy("./admin");

    return {
        dir: {
          input: "site-src",
          output: "site",
          includes: '_includes'
        },
        templateFormats : ["html", "md", "css", "njk"],
        htmlTemplateEngine : "njk",
        markdownTemplateEngine : "njk"
      };
}