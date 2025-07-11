---
title: how i save $300/month on code signing with a raspberry pi
date: 2025-06-29
---

if you don't want Windows to flag your app as malicious or show scary SmartScreen warnings to users, you need a code signing certificate.

you've got a few main options for providers: SSL.com, DigiCert and Sectigo (plus their army of resellers). these providers offer two types of certificates: Organization Validation (OV) and Extended Validation (EV).

OV certificates are cheaper but still trigger SmartScreen warnings. EV certificates are more expensive and have stricter verification requirements, but users won't see SmartScreen warnings, and if you're signing kernel drivers, EV is your only option.

## the sectigo fiasco

my first mistake was going for the cheapest EV certificate i could find, which led me to a sectigo reseller. i figured i'd just give them my company details, pay the fee, and get the certificate.

it wasn't that simple.

the process turned into endless back-and-forth. they'd request a document, i'd send it, then nothing for a week. then they'd ask for something else. this went on for two months. bank statements, utility bills, incorporation docs - you name it. i'm surprised they didn't ask for my birth certificate.

two months later, after jumping through all their hoops, they delivered one final blow: "since your company is less than 3 years old, you need to hire a notary."

at this point, i threw in the towel. luckily, getting a refund was pretty simple. all i had to do was submit a ticket, and i had the money back in my bank account in less than a day.

Sectigo isn't even the cheapest provider anymore, so there's genuinely no reason to use them.

## finding a new provider

after that experience, i went back to the drawing board. i considered using DigiCert after a friend's recommendation, but they charge nearly $1,000 per year for an EV certificate.

i then discovered SSL.com. as of writing this, they charge $299/year for a 2-year EV certificate, which is pretty reasonable. the only weird thing was them trying to sell me a YubiKey for almost $300 when you can easily get one directly from Yubico for $50.

the issuance process was pretty easy. submit paperwork (incorporation docs, DUNS number, Google Business profile, passport), wait about a week, then take their call to finalize everything.

i followed [their guide](https://www.ssl.com/how-to/key-generation-and-attestation-with-YubiKey/) to generate the keypair on the YubiKey i already owned, but i couldn't get it to work. after reaching out to support and doing some troubleshooting, they re-issued the certificate and everything worked perfectly. saved over $250 by using my own YubiKey instead of buying theirs!

## the $100 monthly bill

here's where things got annoying. SSL.com automatically signed me up for their eSigner service without my knowledge, and i only found out when i got hit with a $100 bill after the first month.

eSigner is their API for code signing, and they charge $100/month for the basic plan, which includes 10 signatures. since i needed to sign more than 10 files, i was looking at the $300/month tier just to sign my app. that's more than the certificate itself!

i contacted support to ask for a refund. at first, they only offered account credit, but after pushing back a bit, they refunded the $100 to my account.

i still wanted to sign through CI, so i started looking for ways to do it myself.

## cloud options are expensive

my first thought was to use AWS or GCP - their KMS services are inexpensive and support this use case. however, SSL.com charges $500 just for the privilege, on top of some usage-based fees. and to make things even weirder, they require someone to watch you import the certificate over a video call.

then i remembered the raspberry pi gathering dust on my desk. why not use that?

## setting up the pi

my goal was to be able to sign Windows binaries from my GitHub Actions pipeline without paying a monthly fee. but there were a couple of challenges:

- **`signtool.exe` is Windows-only**, and i wanted something that could run on Linux.
- i needed a way to interact with the YubiKey programmatically, since signtool requires a GUI for PIN entry.

after some digging, i found [jsign](https://github.com/ebourg/jsign), a cross-platform Java-based code signing tool that supports hardware tokens through PKCS#11.

### setting up jsign

on the Raspberry Pi (running Ubuntu), i installed Java and downloaded the jsign `.jar` file.

```bash
sudo apt update
sudo apt install openjdk-17-jre-headless opensc
wget https://github.com/ebourg/jsign/releases/download/5.0/jsign-5.0.jar
```

to let jsign talk to the YubiKey through the OpenSC library using the PKCS#11 interface, i created this config file (`eToken.cfg`):

```
name = OpenSC-PKCS11
description = SunPKCS11 via OpenSC
library = /usr/lib/opensc-pkcs11.so
slotListIndex = 0
```

here's the full command i used to sign an executable:

```bash
java -jar jsign-5.0.jar \
  --keystore eToken.cfg \
  --alias "Certificate for PIV Authentication" \
  --storetype PKCS11 \
  --storepass "<YubiKey_pin>" \ # Default is 123456
  --tsaurl http://ts.ssl.com \
  --tsmode RFC3161 \
  "<file_to_sign>"
```

### automating the signing process

to automate the signing process, i wrote a small Node.js service that runs on the Pi. it accepts file uploads over HTTP, signs them with jsign, and returns the signed result.

i deployed this service on the Pi behind my VPN, so i can now securely sign binaries from my GitHub Actions runners without exposing the Pi to the public internet.

## it's alive!

here's the setup, up and running (ignore the cables, they're fine...)
![the final result](/blog-assets/windows-code-signing-with-rpi/photo_2025-06-29_05-20-54.jpg)
