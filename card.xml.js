function createCardXml(
    frontImageFileName,
    backImageFileName,
    frontName,
    backName,
    backDetail
) {
    return `<card location.name="table" location.x="500" location.y="500" posZ="0" state="1" rotate="0" owner="" zindex="0">
  <data name="card">
    <data name="image">
      <data type="image" name="imageIdentifier"></data>
      <data type="image" name="front">${backImageFileName}</data>
      <data type="image" name="back">${frontImageFileName}</data>
    </data>
    <data name="common">
      <data name="name">${frontName}</data>
      <data name="size">2</data>
    </data>
    <data name="detail">
      <data name="${backName}">
        <data name="" type="note">${backDetail}</data>
      </data>
    </data>
  </data>
</card>`;
}
