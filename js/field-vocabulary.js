/* ════════════════════════════════════════════════════════════════════════
   GENERATED FILE — do not hand-edit.
   Regenerate: node website/tools/build-field-vocabulary.js

   Sources: js/engine-canonical-fields.js (CANONICAL_FIELDS) and the merged
   synonym layers js/mapping-synonyms.js + -platform + -platform-ext +
   -promoted, read in the same order the app merges them.

     canonical fields        180
     merged fields           232 (4554 raw synonyms)
     platform vocabularies   10
     fields the demo matches 54
     spellings indexed       1176 (normalised, collision-safe)

   columns[]         the field map: one row per headcount-template column
                     whose own name resolves to its field and that at least
                     one system names. sources{} holds the name a system
                     uses; where it has none, the row's own template column
                     is printed in its place, flagged.
   sources[]         every system the registry holds a vocabulary for, in the
                     order the page offers them, with how many of the rows
                     that vocabulary names.
   spellingsByField  canonical field -> normalised header spellings, for the
                     try-it profiler (inverted at load by site.js).
   labels            canonical field -> the name the table shows.
   ════════════════════════════════════════════════════════════════════════ */
window.HS_FIELD_VOCABULARY = {
  version: 'hsvocab-2026-11-01',
  stats: {"canonicalFields":180,"mergedFields":232,"mergedSynonyms":4554,"platforms":10,"templateColumns":19,"tableRows":13,"matchedFields":54,"spellings":1176,"collisions":117,"ambiguousNames":0},

  sources: [
    {"id":"workday","label":"Workday","named":13},
    {"id":"oracle","label":"Oracle Fusion HCM","named":13},
    {"id":"sap_successfactors","label":"SAP SuccessFactors","named":13},
    {"id":"peoplexd","label":"Core HR (People XD)","named":1},
    {"id":"bamboohr","label":"BambooHR","named":12},
    {"id":"resourcelink","label":"ResourceLink","named":3},
    {"id":"itrent","label":"iTrent","named":3},
    {"id":"adp","label":"ADP","named":1},
    {"id":"sage","label":"Sage HR","named":1},
    {"id":"generic","label":"Excel export","named":13,"tag":"EUC"},
  ],

  columns: [
    { key: "EMPLOYEE_ID", label: "Employee Reference", column: "Employee_ID", sources: {"workday":"Worker_ID","oracle":"Person_Number","sap_successfactors":"userId","peoplexd":"People_ID","bamboohr":"Employee #","resourcelink":"Payroll No","itrent":"Employment ID","adp":"Associate ID","sage":"Employee Reference","generic":"Employee_ID"} },
    { key: "DEPARTMENT", label: "Department", column: "Department", sources: {"workday":"Supervisory_Organization","oracle":"ORGANIZATION_NAME","sap_successfactors":"department","bamboohr":"Department","generic":"Department"} },
    { key: "JOB_TITLE", label: "Job Title", column: "Job_Title", sources: {"workday":"Job_Profile_Name","oracle":"JOB_TITLE","sap_successfactors":"jobTitle","bamboohr":"Job Title","generic":"Job_Title"} },
    { key: "GRADE", label: "Grade", column: "Grade", sources: {"workday":"Grade","oracle":"GRADE","sap_successfactors":"grade","bamboohr":"Grade","generic":"Grade"} },
    { key: "FTE", label: "Full Time Equivalent", column: "FTE", sources: {"workday":"FTE","oracle":"FTE","sap_successfactors":"fteValue","bamboohr":"FTE","generic":"FTE"} },
    { key: "GENDER", label: "Legal Gender", column: "Gender", sources: {"workday":"Gender","oracle":"GENDER","sap_successfactors":"gender","bamboohr":"Gender","generic":"Gender"} },
    { key: "ETHNICITY", label: "Ethnicity", column: "Ethnicity", sources: {"workday":"Ethnicity","oracle":"ETHNICITY","sap_successfactors":"ethnicity","bamboohr":"Ethnicity","generic":"Ethnicity"} },
    { key: "DATE_OF_BIRTH", label: "Date of Birth", column: "Date_of_Birth", sources: {"workday":"Date_of_Birth","oracle":"DATE_OF_BIRTH","sap_successfactors":"dateOfBirth","bamboohr":"Date of Birth","generic":"Date_of_Birth"} },
    { key: "START_DATE", label: "Start Date", column: "Start_Date", sources: {"workday":"Hire_Date","oracle":"START_DATE","sap_successfactors":"hireDate","bamboohr":"Hire Date","resourcelink":"Commencement Date","itrent":"Employment Start Date","generic":"Start_Date"} },
    { key: "MANAGER_ID", label: "Manager Reference", column: "Manager_ID", sources: {"workday":"Manager_ID","oracle":"MANAGER_ID","sap_successfactors":"managerId","bamboohr":"Reports To","generic":"Manager_ID"} },
    { key: "COST_CENTRE", label: "Cost Centre", column: "Cost_Centre", sources: {"workday":"Cost_Center_ID","oracle":"COST_CENTRE_CODE","sap_successfactors":"costCentre","generic":"Cost_Centre"} },
    { key: "LOCATION", label: "Location", column: "Location", sources: {"workday":"Location","oracle":"LOCATION","sap_successfactors":"location","bamboohr":"Location","generic":"Location"} },
    { key: "LEAVE_DATE", label: "Leave Date", column: "Leaving_Date", sources: {"workday":"Termination_Date","oracle":"LEAVE_DATE","sap_successfactors":"terminationDate","bamboohr":"Termination Date","resourcelink":"Date Left","itrent":"Leaving Date","generic":"Leaving_Date"} },
  ],

  spellingsByField: {
    "ABSENCE_DAYS": ["absencedays","absencedurationdays","days","daysabsent","dayslost","daysoff","durationdays","sickdays","workingdayslost"],
    "ABSENCE_END": ["absanceend","abscenceend","absenceend","absenceenddate","absenceenddte","absenceended","absenceto","absend","absenddate","absenseend","absentto","backatwork","backdte","backfrom","backon","backtowork","dateback","endabsence","enddteabsence","endofabsence","lastdayabsent","lastdayofabsence","lastsickday","leaveenddate","nwdto","offto","recoverydate","requestenddate","returndate","returndte","returnedon","returnedtowork","returntowork","returntoworkdate","rtwdate","rtwdte","sicknessend","timeoffenddate","todate"],
    "ABSENCE_START": ["1stdayabsent","1stdayoff","absancestart","abscencestart","absencecommenced","absencedate","absencefrom","absencestart","absencestartdate","absencestartdte","absensestart","absentfrom","absstart","absstartdate","awayfrom","dateabsent","dateoff","firstdayabsent","firstdayofabsence","firstdayoff","firstsickday","fromdate","illfrom","leavestartdate","nwdfrom","offfrom","offfromdte","offsickfrom","offworkfrom","requeststartdate","sickfrom","sicknessfrom","sicknessstart","sicksince","sickstart","sickstartdte","startabsence","startdteabsence","startofabsence","timeoffstartdate"],
    "ABSENCE_TYPE": ["absancetype","abscencetype","absencecategory","absencenature","absencereasontype","absencetype","absencetypereference","absensetype","abstype","categoryabsence","earningcode","illnesstype","leavecategory","leavereasontype","leavetypereference","medicalcategory","natureofabsence","paycode","paycodename","reasonabsence","sicknesstype","sicktype","timeoffcategory","timeoffpolicy","timeoffpolicyname","timeofftype","timeofftypereference","typeabsence","typeofabsence"],
    "CARER_STATUS": ["carer","carerstatus","caringfordependants","caringresponsibilities","primarycarer"],
    "CONTRACTED_HOURS": ["contractedhours","contractedhrs","contracthours","contracthrs","contractualhours","defaulthours","hours","hourscontracted","hoursperweek","hourspw","hoursweekly","hrs","hrscontracted","hrsperwk","hrspw","hrswk","normalhours","normalweeklyhours","rotahours","scheduledhours","scheduledhrs","scheduledweeklyhours","shifthours","standardhours","standardhoursperweek","standardhrs","standardworkinghours","stdhrs","weeklycontractedhours","weeklyhours","workinghours","workinghourscontract","workinghrs"],
    "CONTRACT_TYPE": ["assignmenttype","bankyn","casualyn","contarcttype","contingentworkertypereference","contractftpt","contracttype","contracttypecode","contrattype","contrcat","employeecategory","employeeclass","employeetypereference","emptype","exempt","flsacode","flsadesc","flsastatus","ftcyn","ftorpt","ftpt","fullpart","fullparttime","fulltimeorparttime","fulltimeparttimedescription","honoraryyn","hourlypaid","iscontingentworker","isfulltimeemployee","paidper","permtemp","positiontimetypereference","ptcontract","regtemp","regulartemp","regulartemporary","secondmentyn","timetypereference","typecontract","workercategory","workercategorydescription","workercontracttype","worktype","zerohoursyn","zerohrsyn"],
    "COST_CENTRE": ["accountcode","activity","activitycode","budgetcode","cc","cccode","ccid","costcenter","costcentercode","costcenterid","costcenterreference","costcenterreferenceid","costcentre","costcentrecode","costcentreid","costcode","costctr","costnumber","costnumberdescription","financecode","gl","glcode","homecostnumber","homecostnumberdescription","nomcode","nominal","nominalcode","project","projectcode","wbs","wbscode"],
    "DATE_OF_BIRTH": ["age","agedate","birthdate","birthday","birthdte","bornn","brithdate","dateborn","datebornn","dateofbirth","dateofbirthddmmyyyy","dateofbrith","dob","dobdate","dobemployee","employeedob"],
    "DEPARTMENT": ["category","dep","deparment","departement","departemnt","department","departmentcode","departmentdescription","departmentid","departmentname","departmentnumber","dept","deptcode","deptdesc","deptname","deptteam","divdept","divisiondept","dpartment","dpt","dptname","function","functionalarea","homedepartment","homedepartmentcode","homedepartmentdescription","homedeptdesc","organisationunit","organization","organizationname","organizationunit","orglevel1","orglevel2","orgname","orgunit","orgunitname","section","supervisoryorg","supervisoryorganization","supervisoryorganizationreference","team","teamdepartment","teamdept","teamname","unit"],
    "DIVISION": ["bu","businessdivision","businesssegment","businessunit","businessunitcode","businessunitdescription","businessunitname","directorate","division","divisiondescription","divisionname","region","segment"],
    "EMAIL": ["bestemail","businessemail","companyemail","email","emailaddress","emailaddressdata","emailurl","emailwork","homeemail","homephone","mobilephone","personalemail","primarycontactemail","primaryhomeemail","primaryworkemail","supervisoremail","workemail","workphone","workphoneextension","workphoneplusextension"],
    "EMPLOYEE_ID": ["assignmentid","assignmentidexternal","assignmentnumber","associateid","associateoid","badge","badgeid","badgeno","badgenumber","bdgeno","clckno","clock","clockno","clocknumber","contingentworkerid","createdbyuserid","dojref","ee","eeid","eenumber","eeref","emp","empid","emploeeid","employee","employeeid","employeeno","employeenumber","employeeref","employeereference","employeid","employeno","employmentid","emplpyeeid","emplyeeid","emplyeeno","empno","empref","establishmentid","establishmentno","establishmentnumber","externalid","feeearnerid","feeearnerno","feeearnerref","filenumber","hrref","hrreference","id","idemployee","noemployee","numemployee","payroleno","payrolenumber","payrollid","payrollno","payrollnumber","payrollref","payrollreference","payrolno","peopleid","person","personalreference","personalreferencenumber","personid","personidexternal","personnelid","personnelno","personnelnumber","personnelreference","personnumber","personref","recordidemployee","recordkey","ref","staff","staffid","staffno","staffnumber","staffref","universalid","userid","username","usersysid","wageid","worker","workerid","workerno","workernumber","workerpersonnelnumber","workerref"],
    "EMPLOYMENT_TYPE": ["appointmenttype","contract","employeetype","employmentcategory","employmenttype","engagementtype","stafftype","workertype"],
    "ETHNICITY": ["diethnicity","diversityethnicity","eeo","eeoethniccode","eeoethnicdescription","ethncity","ethncode","ethngroup","ethnicbackground","ethnicbackgroundcode","ethnicclassification","ethnicgroup","ethnicicty","ethnicity","ethnicitycode","ethnicitydeclared","ethnicitydescription","ethnicityreference","ethnicityselfdeclared","ethnicityvisualsurveyreference","ethnicorig","ethnicorigin","ethnicty","ethnorigin","race","racedescription","raceethnicity","raceethnicitydescription","raceethnicitydetails"],
    "EXIT_COMMENTS": ["exitcomments","exitfeedback","exitinterviewcomments","exitinterviewnotes","exitsurveycomments","leavercomments","leavingcomments","reasonforleavingcomments"],
    "EXIT_INTERVIEW_SCORE": ["exitinterviewrating","exitinterviewscore","exitnps","exitrating","exitsatisfaction","exitscore","exitsurveyrating","exitsurveyscore","interviewscore","leavernps","leaverrating","leaverscore","leavingscore"],
    "EXIT_SURVEY_COMPLETED": ["exitinterviewcompleted","exitinterviewcompletedyn","exitinterviewdone","exitsurvey","exitsurveycompleted","exitsurveydone","exitsurveydoneyn","leaversurvey","leaversurveycompleted","leaversurveydone","surveycompleted","surveycompletedyn","surveydone"],
    "EXPECTED_LEAVE_DATE": ["expectedenddate","expectedleavedate","noticeenddate","plannedleavedate","scheduledexitdate"],
    "FIRST_NAME": ["christainname","christianname","cristianname","firstname","firstname2","firtsname","fisrtname","fname","forename","fristname","givenname","legalfirstname","legalnamefirstname","middlename","namefirst","preferredname","preferrednamefirstname"],
    "FTE": ["contractedfte","fte","ftedecimal","fteequivalent","ftehours","ftepct","ftevalue","fulltime","fulltimeequivalent","hourfraction","hoursfraction","prorata","ptfactor","wholetimeequivalent","workingdaysperweek","workinghourspercentage","wte"],
    "GENDER": ["declaredgender","employeegender","gendar","gender","gendercode","genderdeclared","genderdescription","gendereeo","genderforeeo","genderidentityreference","genderlegal","gendermf","genderreference","gendre","gneder","legalgender","legalsex","malefemale","mf","reportinggender","selfdeclaredgender","sex","sexatbirth","sexcode","sexmf"],
    "GENDER_IDENTITY": ["genderidentity","genderreassignment","identifiedas","identifiedgender","selfidentifiedgender","transgenderstatus"],
    "GRADE": ["a4cband","afcband","band","bandgrade","careerlevel","classification","grade","gradeband","gradecode","gradeladdername","gradelevel","gradename","gradepay","gradestepname","grd","haygradepoints","haygrd","jegrd","jescore","jg","jobband","jobclassification","jobcode","jobgrade","joblevel","joblevelreference","jobprofilereference","level","levelgrade","managementlevelreference","nhsbnd","njcgrd","orglevel","payband","paygrade","paygradecode","paygradedescription","paygradereference","paygrd","pqe","salaryband","salaryscale","senioritylevel","tier","yrpqe","yrspqe"],
    "HOME_POSTCODE": ["addr1","addr2","address1","address2","addresspostcode","country","countryregionreference","employeepostcode","homepc","homepostalcode","homepostcode","homezip","homezipcode","municipality","postalcode","postcode","primaryaddresszippostalcode","region1","residentialpc","residentialpostcode","state","statecode","townorcity","zip","zipcode"],
    "JOB_FAMILY": ["careerfamily","jobcategory","jobfamily","jobfamilygroup","jobfunction","jobgroup","rolefamily"],
    "JOB_TITLE": ["businesstitle","jobname","jobprofile","jobprofilename","jobtitle","jobtitledesc","jobtitledescription","position","positiondescription","positionname","positiontitle","rolename","roletitle","title"],
    "LAST_NAME": ["familyname","famliyname","famlyname","lastname","lastname2","legallastname","legalnamelastname","lname","namefamily","namelast","preferrednamelastname","previouslastname","surame","surname","surnme"],
    "LEAVE_DATE": ["contractenddate","dateend","dateleaving","dateleft","dateleftemployment","dateofleaving","dateofterm","dateoftermination","datereturned","dateterminated","departuredate","departuredte","dol","effectiveenddate","efftermdate","employmentenddate","enddate","endemploymentdate","exitdate","exitdte","hasleft","lastdayemployment","lastdayofwork","lastdayworked","lastworkingdate","lastworkingday","leavedate","leaverdate","leavingdate","leavingdte","left","leftdate","leftdte","leftemployment","lwd","lwddate","positionenddate","resignationdate","resignatondate","ressignationdate","separationdate","termdate","termdte","termiationdate","terminationdate","terminationdte","terminationlastdayofwork","terminatondate","termnationdate"],
    "LEAVE_REASON": ["actioncode","attritioncategory","attritionreason","bonuscomment","bonusreason","commissioncomment","contractend","departurereason","dismissal","dismissalreason","dismissed","endofcontract","endofcontractreason","endoffixedtermcontract","eventreason","exitcategory","exitreason","hirereason","leavereason","leaverreason","leavertype","leavingcategory","leavingreason","leavingreasoncode","mutualagreement","mutualconsent","paychangereason","primaryterminationreasonreference","reasoncode","reasonexit","reasonforleaving","reasonleaving","reasonleft","reasonterm","redundancy","redundancyreason","redundancytype","redundant","resignation","resignationreason","resignatonreason","ressignationreason","retirement","separationreason","terminationbymutualagreement","terminationreason","terminationreasoncode","terminationreasondescription","terminationreasonreference","terminationrehireid","terminationstatusid","terminationtypeid","termreason","termtype","transferofundertakings","tupe","tupetransfer","whyleaving","whyleft"],
    "LEAVE_TYPE": ["leavecode","leavetype","terminationcategory","terminationtype","typeofleave","voluntaryinvoluntary","voluntaryleaver","voluntaryyn"],
    "LOCATION": ["baselocation","basesite","branch","branchcode","branchname","building","buildingname","businesssitereference","city","homelocationdescription","issuingcountry","loc","location","locationdescription","locationid","locationname","locationoffice","locationreference","locationsite","locationwork","locn","office","officename","primarylocation","store","storecode","storename","trust","trustname","trustsite","visatype","wardcode","wardname","workloc","worklocation","worklocationdescription","worklocn","workplace","workspacereference","wrd"],
    "MANAGER_ID": ["custommanagerexternalids","directmanager","hmid","hmref","hrmanagerid","linemanagerid","linemanagerref","linemanagerreference","linemangerid","linemngrid","lm","lmid","lmno","lmref","managarid","manageerid","manager","managerasoflastdetectedmanagerchangereference","managerassignmentnumber","managerassociateid","manageremployeeid","managerexternalid","managerid","managerno","managerpersonidexternal","managerpersonnelnumber","managerpersonnumber","managerref","managerreference","managerworkerid","mangerid","matrixmanager","matrixmanagerexternalids","mgr","mgrid","mgrref","primarycontact","reportsto","reportstoassociateid","reportstoemployee","reportstoemployeeid","reportstoid","reportstopersonnumber","reportstoposition","reportstopositionid","reportstoworkerid","reptoid","secondmanagerexternalid","supervisoreid","supervisorfilenumber","supervisorid","supervisornumber","supervisorpersonnumber","supervisorref","supervisorworkerid","supvid","supvref"],
    "MANAGER_NAME": ["linemanager","linemanagername","managerfullname","managername","reportstolegalname","reportstoname","supervisor","supervisorname"],
    "NATIONALITY": ["citizenship","countryofcitizenship","nationality","nationalitystatus"],
    "PERIOD": ["asatdate","asofdate","asofeffectivedate","asofentrydatetime","bonusdate","commisiondate","commissiondate","compensationperiod","completiondate","datadate","date","dateloaned","effectivedate","eom","eomdate","eomonth","expirationdate","expires","expirydate","extractdate","filedate","issued","issueddate","lastchanged","month","monthend","payperiod","payperiodend","payrateeffectivedate","period","periodenddate","periodname","reportdate","reportingdate","reportingperiod","reportperiod","reportperiodend","rundate","salaryperiod","snapshotdate","vestingdate","vestinggrantdate","vestingmonths","vestingscheduleid"],
    "PERIOD_END": ["endofmonth","periodend","reportingperiodend"],
    "PERIOD_START": ["monthstart","periodstart","periodstartdate","reportingperiodstart"],
    "PHI": ["incomeprotection","insurancefunded","ipfunded","longtermdisability","ltd","permanenthealthinsurance","phi","phiclaim","phifunded"],
    "PROBATION_END_DATE": ["endofprobation","probationaryenddate","probationaryperiodend","probationend","probationenddate","probationenddte","probationperiodend","probationreviewdate"],
    "REASON_DESC": ["absencedescription","absencenotes","absencereason","description","details","reason","reasondesc","reasondescription","reasondetail","sicknessreason"],
    "REGRETTABLE": ["highvalueleaver","isregrettable","regrettable","regrettableflag","regrettableleaver","regrettableloss","regrettableterm","regrettabletermination","regrettableyn","regretted","talentrisk","terminationregrettable","valuedleaver"],
    "RTW": ["backtoworkinterview","backtoworkyn","btwdone","btwyn","returninterview","returninterviewcompleted","returninterviewdone","returninterviewyn","returntoworkcompleted","returntoworkinterview","rtw","rtwcomplete","rtwcompleted","rtwcompletedyn","rtwconducted","rtwconversation","rtwdone","rtwdoneyn","rtwinterview","rtwinterviewcompleted","rtwinterviewdone","rtwyn"],
    "SALARY": ["actualsalary","annualpay","annualsalary","annualsalaryamount","annualsalaryfte","basepay","basesalary","basicsalary","compensationamount","currentsalary","grosssalary","pay","payrate","salary","salaryamount"],
    "SITE": ["buildingcode","locationcode","officelocation","site","sitecode","sitename","worksite"],
    "SOCIAL_MOBILITY": ["firstinfamilytouniversity","freeschoolmeals","parentaloccupation","socialmobility","socioeconomicbackground"],
    "START_DATE": ["adjustedservicedate","cliffmonths","commenced","commencementdate","commencementdte","companyentrydate","continuousservicedate","continuousservicestartdate","contractstartdate","datecommenced","datehired","datejoined","dateofcommencement","dateofemployment","dateofhire","dateofjoining","datestart","datestarted","doj","effectivestartdate","employmentdate","employmentdte","employmentstart","employmentstartdate","engagementstartdate","esd","firstdayofwork","grantdate","hiredate","hireddate","hiredte","hiringdate","joindate","joindte","joingingdate","joiningdate","joiningdte","joningdate","originaldateofhire","originalhiredate","originalstartdate","positionstartdate","rehiredate","senioritydate","servicestart","servicestartdate","startdate","startdte","startofemployment"],
    "STATUS": ["acastatus","acastatuscategory","active","activestatus","activeyn","assignmentstatus","assignmentstatustype","bank","bankstaff","casualworker","currentlyactive","employeestatus","employmenthistorystatus","employmentstatus","employmentstatusreference","emplstatus","empstatus","inactive","jobstatus","liveyn","onsecondment","openingstatus","positionstatus","positionstatusdescription","positionworkertypereference","poststatus","recordstatus","reqstatus","requisitionstatus","rolestatus","seconded","secondment","stat","status","statuscode","statuscurrent","statusdesc","statushr","statuspayroll","sts","vacancystatus","workerstatus"],
    "SUB_DEPARTMENT": ["subdepartment","subdepartmentdescription","subdepartmentname","subdept"],
    "TENURE_MONTHS": ["employeetenure","lengthofservice","los","losmonths","monthsservice","servicelengthmonths","servicemonths","tenure","tenuremonths","yearsservice"],
    "TUPE_TRANSFER_DATE": ["transferdate","tupedate","tupetransferdate"],
    "VETERAN_STATUS": ["armedforces","exarmedforces","forcesveteran","militaryservice","veteran","veteranstatus"],
    "VOLUNTARY": ["dismissedyn","employeeinitiated","employerinitiated","exittype","involyn","isvoluntary","regretyn","resignationflag","resignedyn","separationtype","terminationinvoluntary","terminationtypedescription","vi","volinvol","voluntary","voluntaryflag","voluntaryorinvoluntary","voluntaryresignation","voluntaryterm","voluntarytermination","volyn"],
    "WORK_PATTERN": ["contractedpattern","employmentpattern","flexibleworkingpattern","hourspattern","pattern","shiftpattern","workarrangement","workingarrangement","workingpattern","workingschedule","workpattern","workschedule"],
  },

  labels: {
    "ABSENCE_DAYS": "Absence Days",
    "ABSENCE_END": "Absence End",
    "ABSENCE_START": "Absence Start",
    "ABSENCE_TYPE": "Absence Type",
    "CARER_STATUS": "Carer Status",
    "CONTRACTED_HOURS": "Contracted Hours",
    "CONTRACT_TYPE": "Contract Type",
    "COST_CENTRE": "Cost Centre",
    "DATE_OF_BIRTH": "Date of Birth",
    "DEPARTMENT": "Department",
    "DIVISION": "Division",
    "EMAIL": "Email Address",
    "EMPLOYEE_ID": "Employee Reference",
    "EMPLOYMENT_TYPE": "Employment Type",
    "ETHNICITY": "Ethnicity",
    "EXIT_COMMENTS": "Exit Comments",
    "EXIT_INTERVIEW_SCORE": "Exit Interview Score",
    "EXIT_SURVEY_COMPLETED": "Exit Survey Completed",
    "EXPECTED_LEAVE_DATE": "Expected Leave Date",
    "FIRST_NAME": "First Name",
    "FTE": "Full Time Equivalent",
    "GENDER": "Legal Gender",
    "GENDER_IDENTITY": "Identified Gender",
    "GRADE": "Grade",
    "HOME_POSTCODE": "Home Postcode",
    "JOB_FAMILY": "Job Family",
    "JOB_TITLE": "Job Title",
    "LAST_NAME": "Last Name",
    "LEAVE_DATE": "Leave Date",
    "LEAVE_REASON": "Leave Reason",
    "LEAVE_TYPE": "Leave Type",
    "LOCATION": "Location",
    "MANAGER_ID": "Manager Reference",
    "MANAGER_NAME": "Manager Name",
    "NATIONALITY": "Nationality",
    "PERIOD": "Reporting Period",
    "PERIOD_END": "Period End",
    "PERIOD_START": "Period Start",
    "PHI": "PHI Funded",
    "PROBATION_END_DATE": "Probation End Date",
    "REASON_DESC": "Reason Description",
    "REGRETTABLE": "Regrettable Leaver",
    "RTW": "Return to Work Completed",
    "SALARY": "Salary",
    "SITE": "Site",
    "SOCIAL_MOBILITY": "Social Mobility",
    "START_DATE": "Start Date",
    "STATUS": "Employment Status",
    "SUB_DEPARTMENT": "Sub-department",
    "TENURE_MONTHS": "Tenure (months)",
    "TUPE_TRANSFER_DATE": "TUPE Transfer Date",
    "VETERAN_STATUS": "Veteran Status",
    "VOLUNTARY": "Voluntary Leaver",
    "WORK_PATTERN": "Working Pattern",
  }
};
