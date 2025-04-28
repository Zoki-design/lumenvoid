import { View, TextInput, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { TextCaption, TextSmall } from './StyledText';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  maxLength?: number;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  maxLength,
  keyboardType = 'default',
  autoCapitalize = 'none',
  leftIcon,
  rightIcon,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <TextCaption style={styles.label}>{label}</TextCaption>}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.focused,
        error && styles.error
      ]}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        
        <TextInput
          style={[
            styles.input,
            multiline && styles.multiline,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || secureTextEntry) && styles.inputWithRightIcon,
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={Colors.text.tertiary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidePassword}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          maxLength={maxLength}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {secureTextEntry ? (
          <TouchableOpacity 
            style={styles.iconRight} 
            onPress={togglePasswordVisibility}
          >
            {hidePassword ? 
              <Eye size={20} color={Colors.text.tertiary} /> : 
              <EyeOff size={20} color={Colors.text.tertiary} />
            }
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.iconRight}>{rightIcon}</View>
        ) : null}
      </View>
      
      {error && <TextSmall style={styles.errorText}>{error}</TextSmall>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing.md,
  },
  label: {
    marginBottom: Layout.spacing.xs,
    color: Colors.text.secondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.background.primary,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: Layout.spacing.md,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: Colors.text.primary,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: Layout.spacing.md,
  },
  inputWithLeftIcon: {
    paddingLeft: Layout.spacing.xs,
  },
  inputWithRightIcon: {
    paddingRight: Layout.spacing.xs,
  },
  iconLeft: {
    paddingLeft: Layout.spacing.md,
  },
  iconRight: {
    paddingRight: Layout.spacing.md,
  },
  focused: {
    borderColor: Colors.primary.default,
  },
  error: {
    borderColor: Colors.error.default,
  },
  errorText: {
    color: Colors.error.default,
    marginTop: Layout.spacing.xs,
  },
});