(function () {
  window.addEventListener('load', makeInfallible(scan));

  // Find all 'object' elements embedding SVG documents with a 'inkscapeLayers'
  // attribute, assume such SVG documents are Inkscape documents, and
  // selectively display the Inkscape layers named in the 'inkscapeLayers'
  // attribute. For example:
  //
  //   <object data="foo.svg" type="image/svg+xml" inkscapeLayers='a b c'>
  //
  // This displays only the layers named 'a', 'b', and 'c'. All other layers are
  // marked with 'display:none' style attributes.
  function scan() {
    for (let object of iter(document.getElementsByTagName('object'))) {
      let layersAttr = object.getAttribute('inkscapeLayers');
      if (layersAttr) {
        let layers = Set(layersAttr.split(' '));

        let svgDoc = object.contentDocument;
        clean(svgDoc);

        let eltCount = 0;
        for (let elt of iter(svgDoc.querySelectorAll("[id^=layer]"))) {
          eltCount++;
          elt.setAttribute('style', 'display:none');
          if (layers.has(elt.getAttribute('inkscape:label')))
            elt.setAttribute('style', 'display:inline');
        }
        console.log("" + eltCount + " layer elements, inkscapeLayers = " + uneval(layersAttr));
      } else {
        console.log("no inkscapeLayers attribute");
      }
    }
  }

  function makeInfallible(f) {
    return function (...args) {
      try {
        return f.apply(this, args);
      } catch (ex) {
        console.log(f.name + " threw an exception: " + ex);
        console.log(ex.stack);
        return undefined;
      }
    }
  }

  function iter(arrayish) {
    for (let i = 0; i < arrayish.length; i++) {
      yield arrayish[i];
    }
  }

  // For all Inkscape layers in svgDoc, remove 'display:none' style if
  // present.
  //
  // In Inkscape, if you make a layer hidden (which is handy to do while
  // editing), Inkscape saves that as a 'display:none' style on the <g>
  // element representing the layer. So what I consider my personal editing
  // session state ends up affecting how the drawing displays, in the
  // presentation.
  //
  // It's a pain to have to remember to make all layers visible every time I
  // save the document, so just clean them off here.
  function clean(svgDoc) {
    for (let group of iter(svgDoc.getElementsByTagName('g'))) {
      if (group.getAttribute('inkscape:groupmode') == 'layer' &&
          group.getAttribute('style') == 'display:none') {
        group.removeAttribute('style');
      }
    }
  }
})();
