// script to dynamically resize and reposition title

// function for detecting title's position vis-a-vis the title's background
function isOverflown(element, container) {
  let el_height = parseInt(window.getComputedStyle(element, null).getPropertyValue("height"));
  let cont_height = parseInt(window.getComputedStyle(container, null).getPropertyValue("height"));
  //leave some breathing room
  return el_height > 0.8*cont_height;
};

function size_adjust() {
  // grabbing parameters from view
  let title = document.getElementById("headtext");
  let title_container = document.getElementById("headtexteffect");
  let fontSize = parseInt(window.getComputedStyle(title, null).getPropertyValue("font-size"));
  let lineHeight = parseInt(window.getComputedStyle(title, null).getPropertyValue("line-height"));
  console.log("Initial font size "+fontSize+", line height "+lineHeight);

  // initiate counter for output
  let size_reduction = 0;
  let size_increase = 0;

  // loop to scale down the font size and line height according to background size
  for (let i=fontSize; i >= 0;) {
    if (isOverflown(title, title_container)) {
      fontSize--;
      lineHeight--;
      size_reduction++;
      title.style.fontSize = fontSize + "px";
      title.style.lineHeight = lineHeight + "px";
    } else {
      console.log("Test if font is too small at "+fontSize);
      fontSize++;
      lineHeight++;
      title.style.fontSize = fontSize + "px";
      title.style.lineHeight = lineHeight + "px";
      size_increase++;
      if (isOverflown(title, title_container)) {
        fontSize--;
        lineHeight--;
        size_increase--;
        title.style.fontSize = fontSize + "px";
        title.style.lineHeight = lineHeight + "px";
        console.log("Title fits well after "+size_reduction+" reductions and "+size_increase+" increases");
        console.log("Changed font size to "+
          parseInt(window.getComputedStyle(title, null).getPropertyValue("font-size"))+
          " and line height to "+
          parseInt(window.getComputedStyle(title, null).getPropertyValue("line-height")));
        break;
      }
    }
  };

  // procedure to set position for title vis-a-vis the feature image container
  let feature = document.getElementById("headcontainer");
  let title_height = parseInt(window.getComputedStyle(title, null).getPropertyValue("height"));
  let feature_height = parseInt(window.getComputedStyle(feature, null).getPropertyValue("height"));
  console.log("Title height, post adjustment="+title_height);
  console.log("Feature height="+feature_height);
  let title_top_pad = (feature_height - title_height)/2;
  title.style.top = title_top_pad + "px";
  console.log("title_top_pad="+title_top_pad);
};

// default adjustment
size_adjust();

// chrome print event trigger
window.matchMedia('print').addListener(function(mql) {
  if(mql.matches) {
    // readjust the style when the page is printed
    size_adjust();
  } else {
    // readjust the style after print
    size_adjust();
  }
});

// resize adjustment trigger
window.onresize = size_adjust;
