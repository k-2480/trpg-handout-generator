function createDeckXml(cardXmlList) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<card-stack location.name="table" location.x="500" location.y="375" posZ="0" rotate="0" zindex="11" owner="" isShowTotal="true">
  <data name="card-stack">
  <data name="image">
    <data type="image" name="imageIdentifier"></data>
  </data>
  <data name="common">
    <data name="name">デッキ</data>
  </data>
  <data name="detail"></data>
  </data>
  <node name="cardRoot">
    ${cardXmlList.join("\n")}
  </node>
</card-stack>
`;
}
