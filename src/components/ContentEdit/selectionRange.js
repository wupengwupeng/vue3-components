
var currentRange, parentElem, _parentElem, supportRange = typeof document.createRange === 'function';
function getCurrentRange(idd, contentsEdit) {
  var selection,
    range,
    txt = document.getElementById(`${idd}`);
  if (supportRange) {
    selection = document.getSelection();
    if (selection.getRangeAt && selection.rangeCount) {
      range = document.getSelection().getRangeAt(0);
      _parentElem = range.commonAncestorContainer;
    }
  } else {
    range = document.selection.createRange();
    _parentElem = range.parentElement();
  }

  if (_parentElem && (document.getElementById(contentsEdit)?.contains(txt, _parentElem) || txt === _parentElem)) {
    parentElem = _parentElem;
    return range;
  }
  return range;
}
function saveSelection(idd, contentsEdit) {
  currentRange = getCurrentRange(idd, contentsEdit);
  // //console.log(currentRange, "currentRange");
}
function restoreSelection() {
  if (!currentRange) {
    return;
  }
  var selection,
    range;
  if (supportRange) {
    selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(currentRange);
  } else {
    range = document.selection.createRange();
    range.setEndPoint('EndToEnd', currentRange);
    if (currentRange.text.length === 0) {
      range.collapse(false);
    } else {
      range.setEndPoint('StartToStart', currentRange);
    }
    range.select();
  }
}

export { getCurrentRange, saveSelection, restoreSelection }