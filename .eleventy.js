const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(config) {
   

    config.addFilter("contents", require("./filters/contents.js"));


    config.addPlugin(pluginRss);

    config.addPassthroughCopy("./site-src/images");
    config.addPassthroughCopy("./admin");
    config.addPassthroughCopy("./site-src/js");
    config.addCollection('videos', collection => {
      const videoCollection = collection.getFilteredByTag("videos");

      const videosFiltered = videoCollection.filter((video => {
        const today = new Date();
        today.setHours(0,0,0,0);

        const videoDate = video.date.setHours(0,0,0,0);

        return videoDate <= today;
      }));


      return videosFiltered.reverse();
    });


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