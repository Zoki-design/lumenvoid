import { Text, TextProps, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export function TextRegular(props: TextProps) {
  return <Text {...props} style={[styles.regular, props.style]} />;
}

export function TextMedium(props: TextProps) {
  return <Text {...props} style={[styles.medium, props.style]} />;
}

export function TextSemiBold(props: TextProps) {
  return <Text {...props} style={[styles.semiBold, props.style]} />;
}

export function TextBold(props: TextProps) {
  return <Text {...props} style={[styles.bold, props.style]} />;
}

export function TextTitle(props: TextProps) {
  return <Text {...props} style={[styles.title, props.style]} />;
}

export function TextHeading(props: TextProps) {
  return <Text {...props} style={[styles.heading, props.style]} />;
}

export function TextSubheading(props: TextProps) {
  return <Text {...props} style={[styles.subheading, props.style]} />;
}

export function TextBody(props: TextProps) {
  return <Text {...props} style={[styles.body, props.style]} />;
}

export function TextCaption(props: TextProps) {
  return <Text {...props} style={[styles.caption, props.style]} />;
}

export function TextSmall(props: TextProps) {
  return <Text {...props} style={[styles.small, props.style]} />;
}

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'PlusJakartaSans-Regular',
    color: Colors.text.primary,
  },
  medium: {
    fontFamily: 'PlusJakartaSans-Medium',
    color: Colors.text.primary,
  },
  semiBold: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: Colors.text.primary,
  },
  bold: {
    fontFamily: 'PlusJakartaSans-Bold',
    color: Colors.text.primary,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    lineHeight: 34,
    color: Colors.text.primary,
  },
  heading: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    lineHeight: 29,
    color: Colors.text.primary,
  },
  subheading: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 20,
    lineHeight: 24,
    color: Colors.text.primary,
  },
  body: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text.primary,
  },
  caption: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text.secondary,
  },
  small: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.text.tertiary,
  },
});