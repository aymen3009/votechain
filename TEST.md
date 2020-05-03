*** clean containers *** 
hurl clean 


*** start the network *** 
hurl new 

*** start the chaincode *** 
npm  run cc:start student 


*** upgrade the chaincode ***
npm run cc:upgrade student <version>

## API 
*** first time  or after modification of api.json *** 
conv-rest-api generate api -c student -f ./student.config.json
npx lerna bootstrap
*** to start the web server *** 
npx lerna run start --scope server --stream

*** interact with the API using the curl util ***
curl http://localhost:8000/student/.. -H "Content-Type: application/json" --request POST  --data 
curl http://localhost:8000/student/.. -H "Content-Type: application/json" --request GET 


*** invoke ***
hurl invoke student student_create 1600710 aymen 30-09-1997 ars3 30-09-2015 13473678 licence

hurl invoke student student_addelection election2020 'election for test ' licence '03/12/2020 08:00' '03/12/2020 17:00' '03/10/2020 08:00' '03/09/2020 08:00' '03/09/2020 17:00' '03/10/2020 17:00'


hurl invoke student student_addcondidate election2020 c1600710 1600710 uget
hurl invoke student student_addelection desc name licence 05-03-2020 05-05-2020 05-03-2020 05-03-2020 05-05-2020 05-05-2020 2 admin testelec15
hurl invoke student student_addcondidate testelec15 condidate 1600710 uget
hurl invoke student student_dnomination condidate 1600710
hurl invoke student student_addsurv desc name ["choice1","choice2"] 05-03-2020 05-05-2020 1600710 



    {"bdate": "30-09-1997","cin": "13473678","cind": "30-09-2015","classe": "ars3","degree": "licence","id": "1900710","name": "aymen" }