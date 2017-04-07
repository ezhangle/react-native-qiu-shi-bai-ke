

import React from 'react';
import ReactNative, { StyleSheet, Dimensions, Text } from 'react-native';

import color from './Color'

export function Heading1({ style, ...props }) {
    return <Text style={[styles.h1, style]} {...props} />
}

export function Paragraph({ style, ...props }) {
    return <Text style={[styles.p, style]} {...props} />
}

export function Tip({ style, ...props }) {
    return <Text style={[styles.tip, style]} {...props} />
}



const styles = StyleSheet.create({
    h1: {
        fontSize: 24,
        lineHeight: 27,
        color: '#222222',
        fontWeight: 'bold',
        letterSpacing: -1,
    },
    p: {
        fontSize: 15,
        lineHeight: 23,
        color: '#333333',
    },
    tip: {
        fontSize: 14,
        color: '#999999'
    }
});
