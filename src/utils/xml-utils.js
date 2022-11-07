export default {
/*
https://validator-legacy.lantanagroup.com/validator
https://backbeachsoftware.com.au/challenge/index.htm
https://build.fhir.org/ig/HL7/cda-core-2.0/artifacts.html
https://github.com/HL7/C-CDA-Examples/tree/master/Documents/CCD
*/

  exportHL7(fileDataHIS, patient = {}) {
    function download(filename, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
    // var patient = fileDataHIS?.hanhChinh || {};
    let fullName = (patient?.tenNb || "").split(" ");
    if (fullName.length > 1) {
      patient.givenName = fullName
        .filter((item, index) => {
          return index < fullName.length - 1;
        })
        .join(" ");
      patient.family = fullName[fullName.length - 1];
    }

    const renderTienSu = `<!-- ******************** TIỀN SỬ ************************ -->
	<component>
		<section>
			<templateId root="2.16.840.1.113883.10.20.22.2.3.1" extension="2014-06-09"/>
			<code code="11348-0" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Tiền Sử"/>
			<title>Tiền sử</title>
			<text>
				<paragraph>${fileDataHIS?.tienSu}</paragraph>				
			</text>			
		</section>
	</component>`;

    const renderChanDoanVaoVien = `<!-- ******************** CHAN DOAN VAO VIEN ************************ -->
	<component>
		<section>
			<templateId root="2.16.840.1.113883.10.20.22.2.3.1" extension="2014-06-09"/>
			<code code="46241-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Chẩn đoán lúc vào viện"/>
			<title>Chẩn đoán lúc vào viện</title>
			<text>
				<paragraph>${fileDataHIS?.chanDoanLucVaoVien}</paragraph>				
			</text>			
		</section>
	</component>`;

    const renderChanDoanRaVien = `<!-- ******************** CHAN DOAN RA VIEN ************************ -->
	<component>
		<section>
			<templateId root="2.16.840.1.113883.10.20.22.2.3.1" extension="2014-06-09"/>
			<code code="59769-0" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Chẩn đoán ra viện"/>
			<title>Chẩn đoán ra viện</title>
			<text>
				<list>
					<item>Bệnh chính: ${fileDataHIS?.benhChinh}</item>
					<item>Bệnh kèm theo: ${fileDataHIS?.benhKemTheo}</item>
				</list>
			</text>			
		</section>
	</component>`;

    const renderQuaTrinhBenhLy = `<!-- ******************** CHAN DOAN RA VIEN ************************ -->
	<component>
		<section>
			<templateId root="2.16.840.1.113883.10.20.22.2.3.1" extension="2014-06-09"/>
			<code code="10210-3" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Quá trình bệnh lý và diễn biến lâm sàng"/>
			<title>Quá trình bệnh lý và diễn biến lâm sàng</title>
			<text>
			<paragraph>
		${fileDataHIS?.quaTrinhBenhLyVaDienBienCanLamSang}
		</paragraph>
			</text>			
		</section>
	</component>`;

    const renderTomTatKqCls = `<!-- ******************** CHAN DOAN RA VIEN ************************ -->
	<component>
		<section>
			<templateId root="2.16.840.1.113883.10.20.22.2.3.1" extension="2014-06-09"/>
			<code code="30954-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán"/>
			<title>Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán</title>
			<text>
			<paragraph>
		${fileDataHIS?.tomTatKetQuaCls}
		</paragraph>
			</text>			
		</section>
	</component>`;

    const renderPhuongPhapDieuTri = `<!-- ******************** CHAN DOAN RA VIEN ************************ -->
	<component>
		<section>
			<templateId root="2.16.840.1.113883.10.20.22.2.3.1" extension="2014-06-09"/>
			<code code="18776-5" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Phương pháp điều trị"/>
			<title>Phương pháp điều trị</title>
			<text>
			<paragraph>
		${fileDataHIS?.phuongPhapDieuTri}
		</paragraph>
			</text>			
		</section>
	</component>`;

    const renderGhiChu = `<!-- ******************** GHI CHÚ ************************ -->
	<component>
		<section>
			<templateId root="2.16.840.1.113883.10.20.22.2.3.1" extension="2014-06-09"/>
			<code code="51848-0" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Ghi chú"/>
			<title>Ghi chú</title>
			<text>
				<paragraph>${fileDataHIS?.ghiChu}</paragraph>				
			</text>			
		</section>
	</component>`;

    const renderChucNangSong = `<!-- ************* VITAL SIGNS *************** -->
	<component>
		<section>
			<!-- ** Vital Signs section with entries required ** -->
			<!-- Only select vital signs are shown below but a more complete list of common vital signs may include: -->
			<!-- Height, Weight, Body Mass Index, Systolic Blood Pressure, Diastloic Blood Pressure, Heart Rate (Pulse)
			 Respiratory Rate, Pulse Oximetry (spO2), Temperature, Body Surface Area, Head Circumference-->
			<templateId root="2.16.840.1.113883.10.20.22.2.4.1" extension="2014-06-09"/>
			<code code="8716-3" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Chức năng sống"/>
			<title>Chức năng sống (Last Filed)</title>
			<text>
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Blood Pressure</th>
							<th>Pulse</th>
							<th>Temperature</th>
							<th>Respiratory Rate</th>
							<th>Height</th>
							<th>Weight</th>
							<th>BMI</th>
							<th>SpO2</th>
						</tr>
					</thead>
					 <tbody>
						<tr>
							<td></td>
						    <!-- <td>05/20/2014 7:36pm</td>
							You can consolidate Systolic and Diastolic in human view if desired but should retain separate references
							<td>
								<content ID="SystolicBP_1">120</content>/<content ID="DiastolicBP_1">80</content>mm[Hg] </td>
							<td ID="Pulse_1">80 /min</td>
							<td ID="Temp_1">37.2 C</td>
							<td ID="RespRate_1">18 /min</td>
							<td ID="Height_1">170.2 cm</td>
							<td ID="Weight_1">108.8 kg</td>
							<td ID="BMI_1">37.58 kg/m2</td>
							<td ID="SPO2_1">98%</td>-->
						</tr>
					</tbody> 
				</table>
			</text>
			<entry typeCode="DRIV">
				<!-- When a set of vital signs are recorded together, include them in single clustered organizer-->
				<organizer classCode="CLUSTER" moodCode="EVN">
					<templateId root="2.16.840.1.113883.10.20.22.4.26" extension="2014-06-09"/>
					<id root="e6c800c4-4a71-41bf-80e2-e741dd1168e9"/>
					<code code="74728-7" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Chức năng sống"/>
					<statusCode code="completed"/>
					<effectiveTime value="20141001103026-0500"/>
					<!-- Each vital sign should be its own component. Note that systolic and diastolic BP must be separate components-->
					<component>
						<observation classCode="OBS" moodCode="EVN">
							<templateId root="2.16.840.1.113883.10.20.22.4.27" extension="2014-06-09"/>
							<id root="fdbd831b-5919-4f06-9467-76b07022f8e8"/>
							<code code="8480-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="SYSTOLIC BLOOD PRESSURE"/>
							<text>
								<!-- This reference identifies content in human readable formatted text-->
								<reference value="#SystolicBP_1"/>
							</text>
							<statusCode code="completed"/>
							<effectiveTime value="20141001103026-0500"/>
							<!-- Example of Value with UCUM unit. Note that metric units used in this example-->
							<value xsi:type="PQ" value="120" unit="mm[Hg]"/>
							<!-- Additional information of interpretation and/or reference range may be included but are optional-->
							<author typeCode="AUT">
								<time value="20141001103026-0500"/>
								<assignedAuthor>
									<id extension="5555555555" root="1.1.1.1.1.1.1.2"/>
								</assignedAuthor>
							</author>
						</observation>
					</component>
					<component>
						<observation classCode="OBS" moodCode="EVN">
							<templateId root="2.16.840.1.113883.10.20.22.4.27" extension="2014-06-09"/>
							<id root="553f3f45-9046-4659-b3e7-5de904003550"/>
							<code code="8462-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="DIASTOLIC BLOOD PRESSURE"/>
							<text>
								<reference value="#DiastolicBP_1"/>
							</text>
							<statusCode code="completed"/>
							<effectiveTime value="20141001103026-0500"/>
							<value xsi:type="PQ" value="80" unit="mm[Hg]"/>
							<author typeCode="AUT">
								<time value="20141001103026-0500"/>
								<assignedAuthor>
									<id extension="5555555555" root="1.1.1.1.1.1.1.2"/>
								</assignedAuthor>
							</author>
						</observation>
					</component>
					<component>
						<observation classCode="OBS" moodCode="EVN">
							<templateId root="2.16.840.1.113883.10.20.22.4.27" extension="2014-06-09"/>
							<id root="77bfe276-a1dd-4372-9072-e603905acc07"/>
							<code code="8867-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="HEART RATE"/>
							<text>
								<reference value="#Pulse_1"/>
							</text>
							<statusCode code="completed"/>
							<effectiveTime value="20141001103026-0500"/>
							<value xsi:type="PQ" value="80" unit="/min"/>
							<author typeCode="AUT">
								<time value="20141001103026-0500"/>
								<assignedAuthor>
									<id extension="5555555555" root="1.1.1.1.1.1.1.2"/>
								</assignedAuthor>
							</author>
						</observation>
					</component>
					<component>
						<observation classCode="OBS" moodCode="EVN">
							<templateId root="2.16.840.1.113883.10.20.22.4.27" extension="2014-06-09"/>
							<id root="24faa204-db62-4610-864f-cb50b650d0fa"/>
							<code code="8310-5" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="BODY TEMPERATURE"/>
							<text>
								<reference value="#Temp_1"/>
							</text>
							<statusCode code="completed"/>
							<effectiveTime value="20141001103026-0500"/>
							<value xsi:type="PQ" value="37.2" unit="Cel"/>
							<author typeCode="AUT">
								<time value="20141001103026-0500"/>
								<assignedAuthor>
									<id extension="5555555555" root="1.1.1.1.1.1.1.2"/>
								</assignedAuthor>
							</author>
						</observation>
					</component>
					<component>
						<observation classCode="OBS" moodCode="EVN">
							<templateId root="2.16.840.1.113883.10.20.22.4.27" extension="2014-06-09"/>
							<id root="79f25395-8ec6-488b-8c05-becc97f79995"/>
							<code code="9279-1" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="RESPIRATORY RATE"/>
							<text>
								<reference value="#RespRate_1"/>
							</text>
							<statusCode code="completed"/>
							<effectiveTime value="20141001103026-0500"/>
							<value xsi:type="PQ" value="18" unit="/min"/>
							<author typeCode="AUT">
								<time value="20141001103026-0500"/>
								<assignedAuthor>
									<id extension="5555555555" root="1.1.1.1.1.1.1.2"/>
								</assignedAuthor>
							</author>
						</observation>
					</component>
					<component>
						<observation classCode="OBS" moodCode="EVN">
							<templateId root="2.16.840.1.113883.10.20.22.4.27" extension="2014-06-09"/>
							<id root="6d3fa9f8-6049-41bd-b0c3-b0196bb6bd37"/>
							<code code="8302-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="HEIGHT"/>
							<text>
								<reference value="#Height_1"/>
							</text>
							<statusCode code="completed"/>
							<effectiveTime value="20141001103026-0500"/>
							<value xsi:type="PQ" value="170.2" unit="cm"/>
							<author typeCode="AUT">
								<time value="20141001103026-0500"/>
								<assignedAuthor>
									<id extension="5555555555" root="1.1.1.1.1.1.1.2"/>
								</assignedAuthor>
							</author>
						</observation>
					</component>
					<component>
						<observation classCode="OBS" moodCode="EVN">
							<templateId root="2.16.840.1.113883.10.20.22.4.27" extension="2014-06-09"/>
							<id root="2594e631-2189-4e72-9dd1-d6769ee2a7be"/>
							<code code="3141-9" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="WEIGHT"/>
							<text>
								<reference value="#Weight_1"/>
							</text>
							<statusCode code="completed"/>
							<effectiveTime value="20141001103026-0500"/>
							<value xsi:type="PQ" value="108.863" unit="kg"/>
							<author typeCode="AUT">
								<time value="20141001103026-0500"/>
								<assignedAuthor>
									<id extension="5555555555" root="1.1.1.1.1.1.1.2"/>
								</assignedAuthor>
							</author>
						</observation>
					</component>
					<component>
						<observation classCode="OBS" moodCode="EVN">
							<templateId root="2.16.840.1.113883.10.20.22.4.27" extension="2014-06-09"/>
							<id root="5858e765-2ffe-413f-9197-260f2c6e7aa8"/>
							<code code="39156-5" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="BODY MASS INDEX"/>
							<text>
								<reference value="#BMI_1"/>
							</text>
							<statusCode code="completed"/>
							<effectiveTime value="20141001103026-0500"/>
							<value xsi:type="PQ" value="37.58" unit="kg/m2"/>
							<author typeCode="AUT">
								<time value="20141001103026-0500"/>
								<assignedAuthor>
									<id extension="5555555555" root="1.1.1.1.1.1.1.2"/>
								</assignedAuthor>
							</author>
						</observation>
					</component>
					<component>
						<observation classCode="OBS" moodCode="EVN">
							<templateId root="2.16.840.1.113883.10.20.22.4.27" extension="2014-06-09"/>
							<id root="4ce6046c-f6e3-41b0-91fc-2d5325f2bbc3"/>
							<code code="2710-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="OXYGEN SATURATION"/>
							<text>
								<reference value="#SPO2_1"/>
							</text>
							<statusCode code="completed"/>
							<effectiveTime value="20141001103026-0500"/>
							<value xsi:type="PQ" value="98" unit="%"/>
							<author typeCode="AUT">
								<time value="20141001103026-0500"/>
								<assignedAuthor>
									<id extension="5555555555" root="1.1.1.1.1.1.1.2"/>
								</assignedAuthor>
							</author>
						</observation>
					</component>
				</organizer>
			</entry>
		</section>
	</component>`;
    const renderTinhTrangNbRaVien = `<!-- ******************** TÌNH TRẠNG NGƯỜI BỆNH RA VIỆN ************************ -->
	<component>
		<section>
			<templateId root="2.16.840.1.113883.10.20.22.2.3.1" extension="2014-06-09"/>
			<code code="10184-0" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Tình trạng người bệnh ra viện"/>
			<title>Tình trạng người bệnh ra viện</title>
			<text>
				<paragraph>${fileDataHIS?.tinhTrangNb}</paragraph>				
			</text>			
		</section>
	</component>`;

    const renderPatientIds = () => {
      const maCoSo = fileDataHIS?.maCoSo || "124234";
      return `<id extension="${
        fileDataHIS?.patientDocument
      }" root="1.3.6.1.4.1.84${maCoSo.slice(0, 2)}.${maCoSo.slice(2)}"/>`;
    };

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
	<?xml-stylesheet type="text/xsl" href="CDA.xsl"?>
	<!--
	 Title:        Continuity of Care Document (CCD)
	 Filename:     C-CDA_R2_CCD_2.xml 
	 Created by:   Lantana Consulting Group, LLC
	 
	 $LastChangedDate: 2014-11-12 23:25:09 -0500 (Wed, 12 Nov 2014) $
	  
	 ********************************************************
	 Disclaimer: This sample file contains representative data elements to represent a Continuity of Care Document (CCD). 
	 The file depicts a fictional character's health data. Any resemblance to a real person is coincidental. 
	 To illustrate as many data elements as possible, the clinical scenario may not be plausible. 
	 The data in this sample file is not intended to represent real patients, people or clinical events. 
	 This sample is designed to be used in conjunction with the C-CDA Clinical Notes Implementation Guide.
	 ********************************************************
	 -->
	<!-- This CCD_2 illustrates how to represent "no known", "no information", and "pending" in some sections.
		In addition it provides several other sectional data (e.g. Vital Signs) different than other sample CCD -->
	<ClinicalDocument xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="urn:hl7-org:v3" xmlns:voc="urn:hl7-org:v3/voc" xmlns:sdtc="urn:hl7-org:sdtc">
		<!-- ** CDA Header ** -->
		<realmCode code="US"/>
		<typeId extension="POCD_HD000040" root="2.16.840.1.113883.1.3"/>
		<!-- CCD document template within C-CDA 2.0-->
		<templateId root="2.16.840.1.113883.10.20.22.1.2" extension="2014-06-09"/>
		<!-- Globally unique identifier for the document. Can only be [1..1] -->
		<id extension="EHRVersion2.0" root="be84a8e4-a22e-4210-a4a6-b3c48273e84c"/>
		<code code="34133-9" displayName="Summarization of Episode Note" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC"/>
		<!-- Title of this document -->
		<title>${`TÓM TẮT HỒ SƠ BỆNH ÁN`}</title>
		<!-- This is the time of document generation -->
		<effectiveTime value="20141015103026-0500"/>
		<confidentialityCode code="N" displayName="normal" codeSystem="2.16.840.1.113883.5.25" codeSystemName="Confidentiality"/>
		<!-- This is the document language code which uses internet standard RFC 4646. This often differs from patient language within recordTarget -->
		<languageCode code="en-US"/>
		<setId extension="sTT988" root="2.16.840.1.113883.19.5.99999.19"/>
		<!-- Version of this document -->
		<versionNumber value="1"/>
		<recordTarget>
			<patientRole>
				<!-- The id would likely be the patient's medical record number. This root identifies Partners Healthcare as an example -->
				${renderPatientIds()}
				<!-- Additional ids can capture other MRNs or identifiers, such as social security number shown below -->
				
				<!-- HP is "primary home" from valueSet 2.16.840.1.113883.1.11.10637 -->
				<addr use="HP">
					<!-- You can have multiple [1..4] streetAddressLine elements. Single shown below -->
					<streetAddressLine>${fileDataHIS?.diaChi}</streetAddressLine>
				</addr>
				<!-- MC is "mobile contact" from HL7 AddressUse 2.16.840.1.113883.5.1119 -->
				<telecom value="tel:${fileDataHIS?.phone}" use="MC"/>
				<patient>
					<name use="L">
						<given>${patient?.givenName}</given>
						<family>${patient?.family}</family>
					</name>
					<administrativeGenderCode code="${
            (fileDataHIS?.gioiTinh || [])[0] === "1" ? "M" : "F"
          }" displayName="${
      (fileDataHIS?.gioiTinh || [])[0] === "1" ? "Male" : "Female"
    }" codeSystem="2.16.840.1.113883.5.1" codeSystemName="AdministrativeGender"/>
					<!-- Date of birth need only be precise to the day -->
					<birthTime value="${(patient?.ngaySinh
            ? new Date(patient?.ngaySinh)
            : new Date()
          ).format("yyyyMMdd")}"/>
					<!-- <maritalStatusCode code="M" displayName="Married" codeSystem="2.16.840.1.113883.5.2" codeSystemName="MaritalStatusCode"/> -->
					<!-- <religiousAffiliationCode code="1013" displayName="Christian (non-Catholic, non-specific)" codeSystem="2.16.840.1.113883.5.1076" codeSystemName="HL7 Religious Affiliation"/>  -->
					<!-- CDC Race and Ethnicity code set contains the five minimum race and ethnicity categories defined by OMB Standards -->
					<raceCode code="2106-3" displayName="${
            fileDataHIS?.danToc
          }" codeSystem="2.16.840.1.113883.6.238" codeSystemName="Race &amp; Ethnicity - CDC"/> 
					<!-- The raceCode extension is only used if raceCode is valued -->
					<ethnicGroupCode code="2186-5" displayName="${
            fileDataHIS?.quocTich
          }" codeSystem="2.16.840.1.113883.6.238" codeSystemName="Race &amp; Ethnicity - CDC"/>
					<guardian>
						<code code="POWATT" displayName="Power of Attorney" codeSystem="2.16.840.1.113883.1.11.19830" codeSystemName="ResponsibleParty"/>
						<telecom value="tel:${fileDataHIS?.sdtNguoiBaoLanh || 0}" use="MC"/>
						<guardianPerson>
							<name>
								<given>${fileDataHIS?.tenNguoiBaoLanh}</given>
							</name>
						</guardianPerson>
					</guardian>
					<birthplace>
						<place>
							<addr>
								<streetAddressLine>4444 Home Street</streetAddressLine>
								<city>Beaverton</city>
								<state>OR</state>
								<postalCode>97867</postalCode>
								<country>US</country>
							</addr>
						</place>
					</birthplace>
				</patient>				
			</patientRole>
		</recordTarget>
		<!-- The author represents the person who provides the content in the document -->
		<author>
			<time value="20141015103026-0500"/>
			<assignedAuthor>
				<id extension="5555555555" root="2.16.840.1.113883.4.6"/>
				<code code="207QA0505X" displayName="Adult Medicine" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)"/>
				<addr>
					<streetAddressLine>1004 Healthcare Drive </streetAddressLine>
					<city>Portland</city>
					<state>OR</state>
					<postalCode>99123</postalCode>
					<country>US</country>
				</addr>
				<telecom use="WP" value="tel:+1(555)555-1004"/>
				<assignedPerson>
					<name>
						<given>Patricia</given>
						<given qualifier="CL">Patty</given>
						<family>Primary</family>
						<suffix qualifier="AC">M.D.</suffix>
					</name>
				</assignedPerson>
			</assignedAuthor>
		</author>
		<!-- While not required, a second author may be appropriate to represent EHR software used-->
		<author>
			<time value="20141015103026-0500"/>
			<assignedAuthor>
				<id nullFlavor="NI"/>
				<addr>
					<streetAddressLine>1004 Healthcare Drive </streetAddressLine>
					<city>Portland</city>
					<state>OR</state>
					<postalCode>99123</postalCode>
					<country>US</country>
				</addr>
				<telecom use="WP" value="tel:+1(555)555-1004"/>
				<assignedAuthoringDevice>
					<manufacturerModelName>Generic EHR Clinical System 2.0.0.0.0.0</manufacturerModelName>
					<softwareName>Generic EHR C-CDA Factory 2.0.0.0.0.0 - C-CDA Transform 2.0.0.0.0</softwareName>
				</assignedAuthoringDevice>
				<representedOrganization>
					<id extension="3" root="1.3.6.1.4.1.22812.3.99930.3"/>
					<name>The Doctors Together Physician Group</name>
					<telecom value="tel:+1(555)555-1004"/>
					<addr>
						<streetAddressLine>1004 Healthcare Drive </streetAddressLine>
						<city>Portland</city>
						<state>OR</state>
						<postalCode>99123</postalCode>
						<country>US</country>
					</addr>
				</representedOrganization>
			</assignedAuthor>
		</author>
		<!-- The dataEnterer transferred the content created by the author into the document -->
		<dataEnterer>
			<assignedEntity>
				<id extension="333777777" root="2.16.840.1.113883.4.6"/>
				<addr>
					<streetAddressLine>1007 Healthcare Drive</streetAddressLine>
					<city>Portland</city>
					<state>OR</state>
					<postalCode>99123</postalCode>
					<country>US</country>
				</addr>
				<telecom use="WP" value="tel:+1(555)555-1050"/>
				<assignedPerson>
					<name>
						<given>Ellen</given>
						<family>Enter</family>
					</name>
				</assignedPerson>
			</assignedEntity>
		</dataEnterer>
		<!-- The informant represents any sources of information for document content -->
		<informant>
			<assignedEntity>
				<id extension="333444444" root="1.1.1.1.1.1.1.4"/>
				<addr>
					<streetAddressLine>1017 Health Drive</streetAddressLine>
					<city>Portland</city>
					<state>OR</state>
					<postalCode>99123</postalCode>
					<country>US</country>
				</addr>
				<telecom use="WP" value="tel:+1(555)555-1017"/>
				<assignedPerson>
					<name>
						<given>William</given>
						<given qualifier="CL">Bill</given>
						<family>Beaker</family>
					</name>
				</assignedPerson>
				<representedOrganization>
					<name>Good Health Laboratory</name>
				</representedOrganization>
			</assignedEntity>
		</informant>
		<informant>
			<relatedEntity classCode="PRS">
				<!-- classCode "PRS" represents a person with personal relationship with the patient -->
				<code code="SPS" displayName="SPOUSE" codeSystem="2.16.840.1.113883.1.11.19563" codeSystemName="Personal Relationship Role Type Value Set"/>
				<relatedPerson>
					<name>
						<given>Boris</given>
						<given qualifier="CL">Bo</given>
						<family>Jones</family>
					</name>
				</relatedPerson>
			</relatedEntity>
		</informant>
		<!-- The custodian represents the organization charged with maintaining the original source document -->
		<custodian>
			<assignedCustodian>
				<representedCustodianOrganization>
					<id extension="321CX" root="1.1.1.1.1.1.1.1.3"/>
					<name>Good Health HIE</name>
					<telecom use="WP" value="tel:+1(555)555-1009"/>
					<addr use="WP">
						<streetAddressLine>1009 Healthcare Drive </streetAddressLine>
						<city>Portland</city>
						<state>OR</state>
						<postalCode>99123</postalCode>
						<country>US</country>
					</addr>
				</representedCustodianOrganization>
			</assignedCustodian>
		</custodian>
		<!-- The informationRecipient represents the intended recipient of the document -->
		<informationRecipient>
			<intendedRecipient>
				<informationRecipient>
					<name>
						<given>Sara</given>
						<family>Specialize</family>
						<suffix qualifier="AC">M.D.</suffix>
					</name>
				</informationRecipient>
				<receivedOrganization>
					<name>The DoctorsApart Physician Group</name>
				</receivedOrganization>
			</intendedRecipient>
		</informationRecipient>
		<!-- The legalAuthenticator represents the individual who is responsible for the document -->
		<legalAuthenticator>
			<time value="20141015103026-0500"/>
			<signatureCode code="S"/>
			<assignedEntity>
				<id extension="5555555555" root="2.16.840.1.113883.4.6"/>
				<code code="207QA0505X" displayName="Adult Medicine" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)"/>
				<addr>
					<streetAddressLine>1004 Healthcare Drive </streetAddressLine>
					<city>Portland</city>
					<state>OR</state>
					<postalCode>99123</postalCode>
					<country>US</country>
				</addr>
				<telecom use="WP" value="tel:+1(555)555-1004"/>
				<assignedPerson>
					<name>
						<given>Patricia</given>
						<given qualifier="CL">Patty</given>
						<family>Primary</family>
						<suffix qualifier="AC">M.D.</suffix>
					</name>
				</assignedPerson>
			</assignedEntity>
		</legalAuthenticator>
		<!-- The authenticator represents the individual attesting to the accuracy of information in the document-->
		<authenticator>
			<time value="20141015103026-0500"/>
			<signatureCode code="S"/>
			<assignedEntity>
				<id extension="5555555555" root="2.16.840.1.113883.4.6"/>
				<code code="207QA0505X" displayName="Adult Medicine" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)"/>
				<addr>
					<streetAddressLine>1004 Healthcare Drive </streetAddressLine>
					<city>Portland</city>
					<state>OR</state>
					<postalCode>99123</postalCode>
					<country>US</country>
				</addr>
				<telecom use="WP" value="tel:+1(555)555-1004"/>
				<assignedPerson>
					<name>
						<given>Patricia</given>
						<given qualifier="CL">Patty</given>
						<family>Primary</family>
						<suffix qualifier="AC">M.D.</suffix>
					</name>
				</assignedPerson>
			</assignedEntity>
		</authenticator>
		<!-- The participant represents supporting entities -->
		<participant typeCode="IND">
			<!-- typeCode "IND" represents an individual -->
			<associatedEntity classCode="NOK">
				<!-- classCode "NOK" represents the patient's next of kin-->
				<addr use="HP">
					<streetAddressLine>2222 Home Street</streetAddressLine>
					<city>Beaverton</city>
					<state>OR</state>
					<postalCode>97867</postalCode>
					<country>US</country>
				</addr>
				<telecom value="tel:+1(555)555-2008" use="MC"/>
				<associatedPerson>
					<name>
						<given>Boris</given>
						<given qualifier="CL">Bo</given>
						<family>Jones</family>
					</name>
				</associatedPerson>
			</associatedEntity>
		</participant>
		<!-- Entities playing multiple roles are recorded in multiple participants -->
		<participant typeCode="IND">
			<associatedEntity classCode="ECON">
				<!-- classCode "ECON" represents an emergency contact -->
				<addr use="HP">
					<streetAddressLine>2222 Home Street</streetAddressLine>
					<city>Beaverton</city>
					<state>OR</state>
					<postalCode>97867</postalCode>
					<country>US</country>
				</addr>
				<telecom value="tel:+1(555)555-2008" use="MC"/>
				<associatedPerson>
					<name>
						<given>Boris</given>
						<given qualifier="CL">Bo</given>
						<family>Jones</family>
					</name>
				</associatedPerson>
			</associatedEntity>
		</participant>
		<documentationOf>
			<serviceEvent classCode="PCPR">
				<!-- The effectiveTime reflects the provision of care summarized in the document. 
					In this scenario, the provision of care summarized is date when patient first seen -->
				<effectiveTime>
					<low value="20141001"/>
					<!-- The low value represents when the summarized provision of care began. 
						In this scenario, the patient's first visit -->
					<high value="20141015103026-0500"/>
					<!-- The high value represents when the summarized provision of care being ended. 
						In this scenario, when chart summary was created -->
				</effectiveTime>
				<performer typeCode="PRF">
					<functionCode code="PCP" displayName="Primary Care Provider" codeSystem="2.16.840.1.113883.5.88" codeSystemName="Participation Function">
						<originalText>Primary Care Provider</originalText>
					</functionCode>
					<assignedEntity>
						<id extension="5555555555" root="2.16.840.1.113883.4.6"/>
						<code code="207QA0505X" displayName="Adult Medicine" codeSystem="2.16.840.1.113883.6.101" codeSystemName="Healthcare Provider Taxonomy (HIPAA)"/>
						<addr>
							<streetAddressLine>1004 Healthcare Drive </streetAddressLine>
							<city>Portland</city>
							<state>OR</state>
							<postalCode>99123</postalCode>
							<country>US</country>
						</addr>
						<telecom use="WP" value="tel:+1(555)555-1004"/>
						<assignedPerson>
							<name>
								<given>Patricia</given>
								<given qualifier="CL">Patty</given>
								<family>Primary</family>
								<suffix qualifier="AC">M.D.</suffix>
							</name>
						</assignedPerson>
						<representedOrganization>
							<id extension="219BX" root="1.1.1.1.1.1.1.1.2"/>
							<name>The DoctorsTogether Physician Group</name>
							<telecom use="WP" value="tel: +1(555)555-5000"/>
							<addr>
								<streetAddressLine>1004 Health Drive</streetAddressLine>
								<city>Portland</city>
								<state>OR</state>
								<postalCode>99123</postalCode>
								<country>US</country>
							</addr>
						</representedOrganization>
					</assignedEntity>
				</performer>
			</serviceEvent>
		</documentationOf>
		<!-- ******************************************************** CDA Body ******************************************************** -->
		<component>
			<structuredBody>
			${renderChanDoanVaoVien}		
			${renderChanDoanRaVien}		
			${renderQuaTrinhBenhLy}
			${renderTienSu}		
			${renderTomTatKqCls}			
			${renderPhuongPhapDieuTri}			
			${renderTinhTrangNbRaVien}			
			${renderGhiChu}


				
			</structuredBody>
		</component>
	</ClinicalDocument>
	`;

    download("hl7cda.xml", xml);
  },
};
