import React, { useState, useEffect, useRef } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Animated } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation values
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    if (isVisible) {
      // Opening animations
      setShowModal(true);
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(modalTranslateY, {
          toValue: 0,
          delay: 50,
          tension: 65,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (showModal) {
      // Closing animations
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(modalTranslateY, {
          toValue: 1000,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // After animation completes, hide modal and reset values
        setShowModal(false);
        overlayOpacity.setValue(0);
        modalTranslateY.setValue(1000);
      });
    }
  }, [isVisible]);

  const handleOpen = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonOpen,
            pressed && styles.buttonPressed
          ]}
          onPress={handleOpen}>
          <Text style={styles.buttonText}>Show modal message</Text>
        </Pressable>

        <Modal
          transparent={true}
          visible={showModal}
          onRequestClose={handleClose}
          animationType="none"
          statusBarTranslucent>
          
          <Animated.View 
            style={[
              styles.modalOverlay,
              { opacity: overlayOpacity }
            ]}>
            <BlurView intensity={20} style={StyleSheet.absoluteFill}>
              <Pressable 
                style={styles.overlayPressable}
                onPress={handleClose}
              />
            </BlurView>
          </Animated.View>

          <Animated.View
            style={[
              styles.modalWrapper,
              {
                transform: [{ translateY: modalTranslateY }]
              }
            ]}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Modal Message</Text>
              <Text style={styles.modalText}>
                This is your modal content. Press the button below to close.
              </Text>
              
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.buttonClose,
                  pressed && styles.buttonPressed
                ]}
                onPress={handleClose}>
                <Text style={styles.buttonText}>Close</Text>
              </Pressable>
            </View>
          </Animated.View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonOpen: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#4CAF50',
    marginTop: 20,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  overlayPressable: {
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default App;