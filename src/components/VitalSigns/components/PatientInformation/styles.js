export default {
  item: { flexDirection: "row", marginVertical: 5 },
  label: { width: 100, fontSize: 16, color: "#00000050" },
  content: { flex: 1, fontSize: 16, color: "#000000", fontWeight: "bold" },
  patientName: { fontSize: 17, fontWeight: "bold", marginBottom: 5 },
  patientInformation: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: "#FFF",
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  header: { marginHorizontal: 20, flexDirection: "row" },
  headerContent: { fontSize: 18, fontWeight: "bold", flex: 1 },
  headerDate: { flexDirection: "row", alignItems: "center" },
  headerDateContent: { marginRight: 5, fontWeight: "bold", fontSize: 16 },
};
