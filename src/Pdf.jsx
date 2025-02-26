import { Document, Page, Text, View, StyleSheet ,Svg, Line} from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Times-Roman' },

  section: { marginBottom: 10 },

  header: { fontSize: 35, fontWeight: "bold", marginBottom: 5, alignSelf:"center" ,color: 'rgb(0, 0, 129)' },

  email:{fontSize: 20,  alignSelf:"center",  marginTop:7, marginBottom:7},
  cv: { fontSize: 30, fontWeight: "bold", marginBottom: 5, alignSelf:"center" ,color: 'rgb(0, 0, 129)' },
  hr:{ fontWeight: "bold", fontSize: 12 },

  text: { fontSize: 15, textAlign: 'justify'},
  sincerely: {  fontSize: 15, marginBottom: 5}
  // paragraph: { fontSize: 12, marginBottom: 10},
});

const MyDocument = ({ fullName, email, phone, hiringManager, coverLetter }) => {
  return (
    <Document pageLayout="singlePage">
      <Page style={{ ...styles.page, overflow: "hidden" }}>
        <View style={styles.section}>
          <Text style={styles.header}>{fullName}</Text>
        
          <Svg height="10" width="550">
            <Line x1="0" y1="5" x2="500" y2="5" stroke="black" strokeWidth="2" />
          </Svg>
          <Text style={styles.email}>{email} | {phone}</Text>

          <Svg height="10" width="550">
            <Line x1="0" y1="5" x2="500" y2="5" stroke="black" strokeWidth="2" />
          </Svg>
        </View>

        <View style={styles.section}>
          <Text style={styles.cv}> Cover Letter</Text>
          {/* <Text style={styles.text}>{company}</Text> */}
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>Dear {hiringManager},</Text>
          {/* <Text style={styles.text}>{company}</Text> */}
        </View>

        
          {/* {coverLetter.map((item,index) => <Text style={styles.text}>{item}</Text>)} */}
          {(Array.isArray(coverLetter) 
  ? coverLetter 
  : coverLetter.split("\n")
).map((item,index) =><View style={styles.section}> <Text style={styles.text}>{item}</Text>         </View>)}


        
        <View style={styles.section}>
          <Text style={styles.text}>Best Regards,
</Text>

<Text style={styles.text}>
{fullName}
</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;


