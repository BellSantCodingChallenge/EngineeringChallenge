// Importing necessary modules and components
import { Text, TextProps } from './Themed';

/**
 * Custom component for rendering text with the 'SpaceMono' font family.
 * @param {TextProps} props - Text component properties.
 * @returns {JSX.Element} - Rendered MonoText component.
 */
export function MonoText ( props: TextProps ) {
  // Render Text component with additional style for 'SpaceMono' font family
  return <Text { ...props } style={ [ props.style, { fontFamily: 'SpaceMono' } ] } />;
}
