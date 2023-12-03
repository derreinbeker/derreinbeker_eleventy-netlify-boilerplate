CMS.registerEditorComponent({
  // Internal id of the component
  id: "collapsible-note",
  // Visible label
  label: "Collapsible Note",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      name: 'summary',
      label: 'Summary',
      widget: 'string'
    },
    {
      name: 'details',
      label: 'Details',
      widget: 'markdown'
    }
  ],
  // Regex pattern used to search for instances of this block in the markdown document.
  // Patterns are run in a multline environment (against the entire markdown document),
  // and so generally should make use of the multiline flag (`m`). If you need to capture
  // newlines in your capturing groups, you can either use something like
  // `([\S\s]*)`, or you can additionally enable the "dot all" flag (`s`),
  // which will cause `(.*)` to match newlines as well.
  //
  // Additionally, it's recommended that you use non-greedy capturing groups (e.g.
  // `(.*?)` vs `(.*)`), especially if matching against newline characters.
  pattern: /^<details>$\s*?<summary>(.*?)<\/summary>\n(.*?)\n^<\/details>$/ms,
  // Given a RegExp Match object
  // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#return_value),
  // return an object with one property for each field defined in `fields`.
  //
  // This is used to populate the custom widget in the markdown editor in the CMS.
  fromBlock: function(match) {
    return {
      summary: match[1],
      details: match[2]
    };
  },
  // Given an object with one property for each field defined in `fields`,
  // return the string you wish to be inserted into your markdown.
  //
  // This is used to serialize the data from the custom widget to the
  // markdown document
  toBlock: function(data) {
    return `<details>
<summary>${data.summary}</summary>
${data.details}
</details>`;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(data) {
    return `<details>
<summary>${data.summary}</summary>
${data.details}
</details>`;
  }
});


CMS.registerEditorComponent({
  id: "imageWithCaption",
  label: "Bild mit Bildunterschrift",
  fields: [{
          name: "src",
          label: "Bildpfad",
          widget: "string",
          default: "",
      },
      {
          name: "alt",
          label: "Alt",
          widget: "string",
          default: "",
      },
      {
        name: "figcaption",
        label: "Bildunterschrift",
        widget: "text",
        default: "",
    },
  ],
  pattern: /^{% +imageWithCaption +"((?:[^\\"]+|\\.)*)" +"((?:[^\\"]+|\\.)*)" +"((?:[^\\"]+|\\.)*)" +%}/ms,
  fromBlock: function(match) {
      const matchOne = match[1];
      const matchTwo = match[2];
      const matchThree = match[3];
      return {
          src: matchOne,
          alt: matchTwo,
          figcaption: matchThree,
      };
  },
  toBlock: function(obj) {
      return `{% imageWithCaption "${obj.src}" "${obj.alt}" "${obj.figcaption}" %}`;
  },
  toPreview: function(obj) {
    let figcaptionMarkup = "";
    let figcaption = obj.figcaption;
    if (figcaption != null && figcaption != "") {
      // Falls im figcaption-String (escapete) Anführungszeichen sind:
      const unescapedFigcaption = figcaption.replace(/\\/g, '');
      figcaptionMarkup = `<figcaption>${unescapedFigcaption}</figcaption>`;
    }
    let alt = obj.alt;
    let altValue = "";
    if (alt != null && alt != "") {
      // Falls im alt-String (escapete) Anführungszeichen sind:
      let unescapedAltValue = alt.replace(/\\/g, '');
      altValue = unescapedAltValue.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    }
    let imageHTML = `<img src="/${obj.src}" alt="${altValue}">`;
    return `<figure>${imageHTML}${figcaptionMarkup}</figure>`;
  }
});

