# Identity Value Duplicates Checker
This is a Node application that checks for duplicate attribute values on entries in a LDAP catalog.

## Install

### Local computer
Run it on your computer:
* Download the code either with git or the zip file.
* Run the following commands:
```bash
npm install
npm start
```
* Open a browser `http://localhost:3000/:attribute/duplicates to get a list of the duplicates
* Open a browser `http://localhost:3000/:attribute/duplicates/count to get the count

### Docker
User the following docker-compose file and run `docker-compose up`
```yaml
version: "3"

services:
  idv-dup-nin:
    image: rogfk/idv-dups-checker:tag
    ports:
      - "3000:3000"
    environment:
      LDAP_BASE: "o=people"
      LDAP_HOST: "ldap://ldap.domain.no:389"
      LDAP_BIND_PWD: "topsecret"
      LDAP_BIND_DN: "cn=admin,o=org"
```
## Endpoints
There are two endpoints:

* `http://localhost:3000/:attribute/duplicates`
* `http://localhost:3000/:attribute/duplicates/count`

`:attribute` is replaced with the name of the LDAP attribute.

### Endpoints xxample
* `http://localhost:3000/cn/duplicates`
* `http://localhost:3000/mail/duplicates`
* `http://localhost:3000/noredupersonnin/duplicates`

## Environment settings
| Key   | Description                       | Example                   |
|---------------|-----------------------------------|---------------------------|
| LDAP_BASE     | Base for searching for duplicates | o=people                  |
| LDAP_HOST     | URI for LDAP host                 | ldap://ldap.domain.no:389 |
| LDAP_BIND_PWD | Password for the admin account    | topsecret                 |
| LDAP_BIND_DN  | Admin account                     | cn=admin,o=org            |