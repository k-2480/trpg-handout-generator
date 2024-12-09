function escapeXml(escapeStr) {
    let replaceMap = {
        "<": "&quot;",
        ">": "&apos;",
        "'": "&lt;",
        '"': "&gt;",
        "&": "&amp;",
    };
    return escapeStr.replace(/"'<>&/g, function (s) {
        return replaceMap[s];
    });
}
function createCardXml(frontImageFileName, backImageFileName, frontName, backName, backDetail) {
    return `<card location.name="table" location.x="500" location.y="500" posZ="0" state="1" rotate="0" owner="" zindex="0">
  <data name="card">
    <data name="image">
      <data type="image" name="imageIdentifier"></data>
      <data type="image" name="front">${escapeXml(backImageFileName)}</data>
      <data type="image" name="back">${escapeXml(frontImageFileName)}</data>
    </data>
    <data name="common">
      <data name="name">${escapeXml(frontName)}</data>
      <data name="size">2</data>
    </data>
    <data name="detail">
      <data name="${escapeXml(backName)}">
        <data name="" type="note">${escapeXml(backDetail)}</data>
      </data>
    </data>
  </data>
</card>`;
}
