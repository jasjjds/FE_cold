import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextProps, ViewStyle } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

interface TypeWriterProps extends TextProps {
  prefix: string;      // Dòng 1: Chữ thường (Ví dụ: "Xin chào")
  highlight: string;   // Dòng 2: Chữ Gradient (Ví dụ: "ADMIN")
  speed?: number;
  gradientColors?: string[]; // Mảng màu
  containerStyle?: ViewStyle; // Style cho cái hộp bao ngoài
}

const TypeWriter: React.FC<TypeWriterProps> = ({ 
  prefix, 
  highlight, 
  speed = 50, 
  gradientColors = ['#FF0080', '#7928CA', '#FF0080'], 
  containerStyle,
  style, 
  ...props 
}) => {
  // Tổng chiều dài cần gõ = độ dài dòng 1 + độ dài dòng 2
  const totalLength = prefix.length + highlight.length;
  
  const [index, setIndex] = useState(0);

  // Reset khi nội dung thay đổi
  useEffect(() => {
    setIndex(0);
  }, [prefix, highlight]);

  // Logic chạy chữ (Timer)
  useEffect(() => {
    if (index < totalLength) {
      const timeoutId = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    }
  }, [index, totalLength, speed]);

  // Tính toán xem hiện tại đang hiển thị cái gì
  // Nếu index < độ dài prefix -> Đang gõ dòng 1
  // Nếu index > độ dài prefix -> Đã gõ xong dòng 1, đang gõ dòng 2
  const currentPrefix = prefix.slice(0, index);
  const currentHighlight = index > prefix.length ? highlight.slice(0, index - prefix.length) : "";

  // Kiểm tra xem con trỏ nhấp nháy nằm ở đâu
  const isTypingPrefix = index < prefix.length;
  const isFinished = index >= totalLength;

  return (
    <View style={[styles.container, containerStyle]}>
      
      {/* --- DÒNG 1: CHỮ THƯỜNG --- */}
      <Text style={[style, styles.prefixText]} {...props}>
        {currentPrefix}
        {/* Nếu đang gõ dòng 1 thì hiện con trỏ ở đây */}
        {isTypingPrefix && <Text style={styles.cursor}>|</Text>}
      </Text>

      {/* --- DÒNG 2: CHỮ GRADIENT --- */}
      {/* Chỉ render dòng 2 khi bắt đầu có nội dung (để tránh chiếm chỗ trống vô lý) */}
      {(index >= prefix.length) && (
        <MaskedView
          style={{ height: 50, flexDirection: 'row' }} // Set height đủ lớn cho font chữ
          maskElement={
            <View style={{ backgroundColor: 'transparent', flex: 1, alignItems: 'center' }}>
              <Text style={[style, styles.highlightText]} {...props}>
                {currentHighlight}
                {/* Nếu đang gõ dòng 2 (và chưa xong) thì hiện con trỏ ở đây */}
                {!isTypingPrefix && !isFinished && <Text style={styles.cursor}>|</Text>}
              </Text>
            </View>
          }
        >
          <LinearGradient
            colors={gradientColors as any} // Ép kiểu để qua mặt TypeScript
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          >
             {/* Text tàng hình để giữ khung Gradient */}
             <Text style={[style, styles.highlightText, { opacity: 0 }]} {...props}>
                {currentHighlight}
                {!isTypingPrefix && !isFinished && '|'}
              </Text>
          </LinearGradient>
        </MaskedView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Căn giữa toàn bộ
    justifyContent: 'center',
  },
  prefixText: {
    color: '#333', // Màu chữ thường (đen xám)
    marginBottom: 5, // Khoảng cách với dòng dưới
  },
  highlightText: {
    // Style riêng cho dòng Gradient (thường sẽ to hơn, đậm hơn)
    fontWeight: '900', 
  },
  cursor: {
    color: 'orange',
    fontSize: 20,
  }
});

export default TypeWriter;