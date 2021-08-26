module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/style/variables.scss";`,
      },
    },
  },
  pwa: {
    iconPaths: {
      favicon32: "lsdb_favicon.ico",
    },
  },
};
