/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

// Importing necessary modules and components
import { Text as DefaultText, useColorScheme, View as DefaultView } from 'react-native';

// Importing Colors from the constants file
import Colors from '../constants/Colors';

// Defining the ThemeProps type
type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

// Defining TextProps and ViewProps types
export type TextProps = ThemeProps & DefaultText[ 'props' ];
export type ViewProps = ThemeProps & DefaultView[ 'props' ];

/**
 * Custom hook to get the theme color based on the current color scheme.
 * @param {Object} props - Theme color properties.
 * @param {string} colorName - Color name to get from the theme.
 * @returns {string} - Theme color based on the current color scheme.
 */
export function useThemeColor (
  props: { light?: string; dark?: string; },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Get the current color scheme
  const theme = useColorScheme() ?? 'light';
  // Get the color from the props based on the current theme
  const colorFromProps = props[ theme ];

  // Return the color from props if available, otherwise, return the color from the theme
  if ( colorFromProps ) {
    return colorFromProps;
  } else {
    return Colors[ theme ][ colorName ];
  }
}

/**
 * Custom Text component that supports theme colors.
 * @param {TextProps} props - Text component properties.
 * @returns {JSX.Element} - Rendered Text component.
 */
export function Text ( props: TextProps ) {
  // Destructure the props to get style, lightColor, and darkColor
  const { style, lightColor, darkColor, ...otherProps } = props;
  // Get the text color based on the theme color
  const color = useThemeColor( { light: lightColor, dark: darkColor }, 'text' );

  // Render the Text component with the calculated color and other props
  return <DefaultText style={ [ { color }, style ] } { ...otherProps } />;
}

/**
 * Custom View component that supports theme colors.
 * @param {ViewProps} props - View component properties.
 * @returns {JSX.Element} - Rendered View component.
 */
export function View ( props: ViewProps ) {
  // Destructure the props to get style, lightColor, and darkColor
  const { style, lightColor, darkColor, ...otherProps } = props;
  // Get the background color based on the theme color
  const backgroundColor = useThemeColor( { light: lightColor, dark: darkColor }, 'background' );

  // Render the View component with the calculated background color and other props
  return <DefaultView style={ [ { backgroundColor }, style ] } { ...otherProps } />;
}
