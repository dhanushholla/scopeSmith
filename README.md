# ScopeSmith 🚀✨

Welcome to **ScopeSmith** – your smart companion for managing and navigating through named code blocks in VSCode! 🌟 Whether you're wrangling large files or organizing your code into neat blocks, ScopeSmith makes your coding life easier. Let's dive into what makes ScopeSmith a must-have tool!

I've made use of yaemon .. (ya code  - js template) for initial setup(VS code Extn template)

## 🌟 Features

### 1. **Toggle All Code Blocks** 🗂️
Easily collapse or expand all your code blocks in one go. Perfect for quickly navigating through long files or focusing on a specific section of your code.

### 2. **Name Your Code Blocks** 🏷️
Tag your code blocks with descriptive names. This helps in better organization and makes it super easy to locate specific sections of your code when you need them.

### 3. **Search Within Named Blocks** 🔍
Perform precise searches within your named blocks. ScopeSmith handles nested blocks gracefully, ensuring that your search results are accurate and contextually relevant.

## 🚀 Getting Started

### 1. **Installation** 💾

1. **Install ScopeSmith**:(future scope)
   - Open VSCode.
   - Go to the Extensions view (`Ctrl+Shift+X`).
   - Search for "ScopeSmith" and click "Install." 🎉

2. **Local Development**:
   - Clone this repository:
     ```sh
     git clone <repository-url>
     cd <repository-directory>
     ```
   - Install dependencies:
     ```sh
     npm install
     ```
   - Package the extension:
     ```sh
     npx vsce package
     ```
   - Install the generated `.vsix` file in VSCode:
     - Go to Extensions view (`Ctrl+Shift+X`).
     - Click on the ellipsis (`...`) and choose `Install from VSIX...`.
     - Select your `.vsix` file. 📦

### 2. **Using ScopeSmith** 🚀

1. **Toggle Code Blocks**:
   - Run the command `Toggle All Code Blocks` to fold or unfold all your code blocks. This helps in managing large files effortlessly. 🗂️

2. **Name a Code Block**:
   - Select the lines of code you want to name.
   - Run the command `Name Block` and enter a descriptive name. 🌟

3. **Search Within a Block**:
   - Use the command `Search in Block`.
   - Provide the block name and search text in the format `BlockName:searchText`. This will highlight occurrences within the specified block. 🔍

## 🧪 Test UseCases (/test/sampleTestFile.js)

1. **Case 1: Toggle All Code Blocks** 🗂️
   - **Action**: Toggle collapse and expand all blocks.
   - **Expected Outcome**: All blocks should collapse or expand based on the command.

2. **Case 2: Name Selected Lines** 🏷️
   - **Action**: Name a selected block of code.
   - **Expected Outcome**: The selected code block should be prefixed with the chosen name.

3. **Case 3: Search in a Block** 🔍
   - **3a**: Search without block name.
     - **Expected Outcome**: Display an error message indicating the need for a block name. ⚠️
   - **3b**: Search `scope1:harish`.
     - **Expected Outcome**: Highlight 1 occurrence of `harish` in `scope1`. 🔍
   - **3c**: Search `scope1:res`.
     - **Expected Outcome**: Highlight 3 occurrences of `res` in `scope1`. 🔍🔍🔍
   - **3d**: Search `scope1:res` (again).
     - **Expected Outcome**: Highlight 3 occurrences of `res` in `scope1`. 🔍🔍🔍
   - **3e**: Search `scope2:harish`.
     - **Expected Outcome**: Highlight 3 occurrences of `harish` in `scope2`. Note: No highlights in nested `scope3` as it is explicitly nested. 🔍🔍🔍
   - **3f**: Search `scope3:complete`.
     - **Expected Outcome**: Highlight 1 occurrence of `complete` in `scope3`. 🔍
   - **3g**: Search `scope4:harish`.
     - **Expected Outcome**: Highlight 4 occurrences of `harish` in `scope4`. 🔍🔍🔍🔍
   - **3h**: Search word without block name.
     - **Expected Outcome**: Display an error message indicating the need for a block name. ⚠️
   - **3i**: Search `scope1:NoWord`.
     - **Expected Outcome**: Display an error message indicating no matching word found. ⚠️
   - **3j**: Search `scope1:WordNotInScope`.
     - **Expected Outcome**: No occurrences found in `scope1`. 🚫

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. 📜

## 🤝 Contributing

We welcome contributions to ScopeSmith! Please feel free to open issues or pull requests on [GitHub](<repository-url>). Your feedback and contributions help make ScopeSmith even better. 💬🚀

---

Happy coding with ScopeSmith! 🎉🚀
