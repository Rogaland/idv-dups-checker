# Identity Value Duplicates Checker
[![Docker Automated buil](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg)](https://hub.docker.com/r/rogfk/idv-dups-checker/)

This is a Node application that checks for duplicate attribute values on entries in a LDAP catalog.

## Install

### Local computer
Run it on your computer:
1. Download the code either with git or the zip file.
2. Run the following commands:
```shell
$ npm install
$ npm run build
$ export LDAP_HOST=ldap://ldap.domain.no:389 LDAP_BIND_PWD=topsecret LDAP_BIND_DN=cn=admin,o=org LDAP_BASE=o=people
$ npm start
```
3. Open a browser `http://localhost:3000/:attribute/duplicates to get a list of the duplicates
4. Open a browser `http://localhost:3000/api/duplicates/count/:attribute to get the count
5. Open a browser `http://localhost:3000/ to get a web UI

### Docker
User the following docker-compose file and run `docker-compose up`
```yaml
version: "3"

services:
  idv-dups-checker:
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

* `/:attribute/duplicates`
* `/api/duplicates/count/:attribute`

`:attribute` is replaced with the name of the LDAP attribute.

### Endpoints example
* `/cn/duplicates`
* `/mail/duplicates`
* `/noredupersonnin/duplicates`

## Environment settings
| Key   | Description                       | Example                   |
|---------------|-----------------------------------|---------------------------|
| LDAP_BASE     | Base for searching for duplicates | o=people                  |
| LDAP_HOST     | URI for LDAP host                 | ldap://ldap.domain.no:389 |
| LDAP_BIND_PWD | Password for the admin account    | topsecret                 |
| LDAP_BIND_DN  | Admin account                     | cn=admin,o=org            |