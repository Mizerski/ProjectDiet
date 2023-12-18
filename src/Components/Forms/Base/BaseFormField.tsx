abstract class BaseStyle {
  public static errorMessage = {
    errorMessage: {
      color: "red",
      textAlign: "center",
      marginTop: 5,
      fontSize: 11,
    },
  };

  public static fieldContainer = {
    fieldContainer: {
      marginTop: 20,
    },
  };

  public static fieldLabel = {
    fieldLabel: {
      fontSize: 15,
      color: "black",
      fontWeight: "bold",
      marginLeft: 10,
    },
  };
}
const getMandatoryLabel = (label: string, isMandatory: boolean) =>
  `${label}${isMandatory ? "*" : ""}`;

export { BaseStyle, getMandatoryLabel };
