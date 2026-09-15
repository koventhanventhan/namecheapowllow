module.exports = {
  multipass: true,
  js2svg: {
    pretty: true,
    indent: 2
  },
  plugins: [
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupAttrs',
    'minifyStyles',
    'removeTitle',
    'removeDesc',
    'removeUselessDefs',
    'cleanupNumericValues',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeHiddenElems',
    'removeEmptyText',
    'convertColors',
    'removeEmptyAttrs',
    'removeEmptyContainers'
  ]
};
