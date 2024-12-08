import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      mainColor: string;
      subColor: string;
      buttonMainFontColor: string;
      buttonHoverColor: string;
      buttonHoverSubColor: string;
      buttonHoverFontColor: string;
      buttonDisabledColor: string;
      buttonDisabledSubColor: string;
      menuBackgroundColor: string;
      modalBackgroundColor: string;
      galleryNameColor: string;
      redColor: string;
      blueColor: string;
      blackColor: string;
      whiteColor: string;
    };
    fontSize: {
      xxxSmall: string;
      xxSmall: string;
      xSmall: string;
      small: string;
      large: string;
      xLarge: string;
      xxLarge: string;
      xxxLarge: string;
      title: string;
    };
  }
}
