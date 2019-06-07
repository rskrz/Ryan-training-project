/**
 * Let's say that we have a class in our source code that helps us to use files on our computer's file system. 
 * 
 * {@link JsonFileUtility} exists for that reason. It works specifically with JSON files for us. We need to write some tests to make sure that it behaves correctly. 
 */
interface FileReaderUtility {
    filename: string
    doesTextExist(text: string): boolean 
  }
  
  class JsonFileUtility {
    constructor(private fileReader: FileReaderUtility) {    
    }
  
    doesTextExistInFile(filename: string, text: string) {
      this.assertFileIsJsonFile(filename)
  
      this.fileReader.filename = filename
      return this.fileReader.doesTextExist(text)
    }
  
    private assertFileIsJsonFile(filename: string) {
      if (!filename.endsWith(".json")) {
        throw new Error(`File: ${filename} is not a .json file.`) 
      }
    }
  
  }
  
  describe("JsonFileUtility unit tests", () => {
    describe("doesTextExistInFile()", () => {
      it("should fail, providing a filename that is not a .json file", () => {
        let doesTextExistMock = jest.fn()
        let fileReaderStub: FileReaderUtility = {
          filename: "",
          doesTextExist: doesTextExistMock
        }
        let jsonFileUtil = new JsonFileUtility(fileReaderStub)
  
        let givenFileName = "filename.js"
  
        // Here, we want to make sure that the exception in assertFileIsJsonFile() is thrown. 
        // When you use .toThrow(), expect() requires you to pass in a function that when that function runs, it will throw an exception.       
        expect(() => {jsonFileUtil.doesTextExistInFile(givenFileName, "foo")}).toThrow()
        // The code above is a decent error. For internal code, it works. 
        // However, if we are constructing an error where the error message is shown to the end user, we need to be more sure of our code!
        expect(() => {jsonFileUtil.doesTextExistInFile(givenFileName, "foo")}).toThrowError(new Error(`File: ${givenFileName} is not a .json file.`))
        // The FileReaderUtility should not have been called. 
        expect(doesTextExistMock.mock.calls.length).toBe(0)
      })
      it("should ask the file reader dependency if the text exists", () => {
        var expected = true 
  
        let doesTextExistMock = jest.fn().mockReturnValueOnce(expected)
        let fileReaderStub: FileReaderUtility = {
          filename: "",
          doesTextExist: doesTextExistMock
        }
        let jsonFileUtil = new JsonFileUtility(fileReaderStub)
  
        let givenFileName = "filename.json"
  
        expect(jsonFileUtil.doesTextExistInFile(givenFileName, "foo")).toBe(expected)
        expect(doesTextExistMock.mock.calls.length).toBe(1)
  
        expected = false 
        doesTextExistMock.mockReturnValueOnce(expected)
        expect(jsonFileUtil.doesTextExistInFile(givenFileName, "foo")).toBe(expected)
  
        expect(doesTextExistMock.mock.calls.length).toBe(2)
      })
    })
  })