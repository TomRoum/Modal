import React, { useState, useEffect, useRef } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Animated } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Audio } from 'expo-av';
import { Image } from 'expo-image';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  
  // Animation values
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(1000)).current;

  // Load audio on component mount
  useEffect(() => {
    loadSound();
    return () => {
      // Cleanup sound on unmount
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Handle audio playback based on modal visibility
  useEffect(() => {
    if (isVisible && sound) {
      playSound();
    } else if (!isVisible && sound) {
      stopSound();
    }
  }, [isVisible, sound]);

  const loadSound = async () => {
    try {
      const { sound: loadedSound } = await Audio.Sound.createAsync(
        require('./assets/sounds/Maxwell the cat theme.mp3'),
        { shouldPlay: false, isLooping: true }
      );
      setSound(loadedSound);
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  };

  const playSound = async () => {
    try {
      if (sound) {
        await sound.setPositionAsync(0);
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const stopSound = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
      }
    } catch (error) {
      console.error('Error stopping sound:', error);
    }
  };

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
              <Text style={styles.modalTitle}>Maxwell the Cat</Text>
              
              <Image
                source={require('./assets/images/maxwell-spin.gif')}
                style={styles.maxwellGif}
                contentFit="contain"
              />
              
              <Text style={styles.modalText}>
                Vibing to the iconic Maxwell theme
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
    backgroundColor: '#000',
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
    color: '#000',
  },
  maxwellGif: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 12,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
});

export default App;