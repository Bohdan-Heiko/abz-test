import { DEFAULT_COLORS } from "@/utils/constants/Colors"
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"

interface Props {
  visible: boolean
  onClose: () => void
}

export const CameraModal = ({ visible, onClose }: Props) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={() => console.log("modal closed")}
      onDismiss={onClose}
    >
      <Pressable onPress={onClose} style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View
            style={{
              width: "100%",
              paddingTop: 12,
              paddingBottom: 0,
              borderBottomWidth: 1,
              alignItems: "center",
              borderBottomColor: DEFAULT_COLORS.gray
            }}
          >
            <Text style={styles.title}>Choose how you want to add a photo</Text>
          </View>

          <Pressable style={styles.optionButton} onPress={() => console.log("Pres")}>
            <Text style={styles.optionText}>Camera</Text>
          </Pressable>
          <Pressable
            style={[styles.optionButton, styles.borderBottomWidth0]}
            onPress={() => console.log("Pres")}
          >
            <Text style={styles.optionText}>Gallery</Text>
          </Pressable>
        </View>
        <View style={styles.modalContainer}>
          <Pressable
            style={[styles.optionButton, styles.borderBottomWidth0]}
            onPress={onClose}
          >
            <Text style={[styles.optionText, styles.cancelBtnTitle]}>Cancel</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 8,
    gap: 8,
    paddingVertical: 34
  },
  modalContainer: {
    backgroundColor: "rgba(234,234,234,1)",
    opacity: 1,
    borderRadius: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 13,
    marginBottom: 16,
    fontWeight: "600",
    color: DEFAULT_COLORS.dark_gray
  },
  optionButton: {
    width: "100%",
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: DEFAULT_COLORS.gray
  },
  optionText: {
    fontSize: 17,
    color: DEFAULT_COLORS.linking_blue,
    lineHeight: 22,
    textAlign: "center"
  },
  cancelBtnTitle: {
    fontSize: 17,
    fontWeight: "600"
  },
  borderBottomWidth0: {
    borderBottomWidth: 0
  }
})
