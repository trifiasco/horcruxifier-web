# What is this?

An application to secure files through encryption with added layer of security.

## [Check out the live web version in heroku](https://trifiasco-horcruxifier.herokuapp.com/)

## [Check out the CLI version published as an npm package](https://www.npmjs.com/package/horcruxifier)

## Motivation

Everyone has some files they want secured. How can you absolutely make sure that those are secured? Well, hypothetically you can't. Though there are multiple ways you can "Almost" make sure that your files are secured.

I don't if anyone ever thought this before or not. But J. K. Rowling, the creator of Harry Potter, showed us an wonderful way to add a layer of security over the traditional encryption schemes. **Remember how Voldemort wanted to make sure that it's almost impossible to kill him? Yess... By making Horcruxes!!!**

**And that's what this web application does!!!**

## How it works?

Basically this app takes a file and a password from the user. Then run an encryption on the file using the password as the encryption key. Then comes the extra layer -

- Click on the HORCRUXIFIY button
- Upload a file of your choice, and give a strong password. Then submit
- The app takes your file and password, runs an encryption routine.
- **After the encryption, this app divides the encrypted file into several chunks** (Actually 7, because Voldemort did so!!)
- Each chunks is written into files named after the names of the horcruxes. (fan tribute to Harry Potter ^\_^)
- After that, this app zip those files, and returns that to you prompting download.
- After downloading, if you unzip the folder, you will find 7 different encrypted files.

### Well, now what??

Now you have your file - **Encrypted and divided into multiple files**. You can the scatter the files into different locations(or not, your wish). **If someone has to hack your file, they have to collect all 7 files and also the password you used for encryption.** I would say that would not be easy!!

### What if I want to see my original file??

Fear not!! This application works both ways.

- Open the application.
- Click on the **DE-HORCRUXIFY** button.
- You have to now upload - All the 7 encrypted files.
- Give the original password
- Submit, and your original file should be downloaded.

## Limitations

This is really a personal project, done for purely fun purpose. I have tested against images, pdfs, text files. I think it should work for other files too. If you use it and find any bug, please report it.

- [Report a bug](https://github.com/trifiasco/horcruxifier-web/issues)
- Also feel free to open a PR if you have any cool ideas to add here.
