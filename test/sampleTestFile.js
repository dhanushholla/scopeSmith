/**
 * case1 : toggleAllspaces -- shrink and expand
 * case2 : name selected lines as a block
 * case 3: search 
 *      3a : search without block name -error
 *      3b : search scope1:harish -> 1 highlight
 *      3c : search scope1:res  -> 3 highlights
 *      3d : search scope1:res  -> 3 highlights
 *      3e : search scope2:harish ->3 highlights :: although stepTwo is under scope2 .. but it is explicitally nested as scope3, so no hightlight
 *      3f : search scope3:complete -> 1 highlight
 *      3g : search scope4:harish -> 4 highlights  
 *      3h : search word without -> error
 *      3i : search scope1:NoWord -> error
 *      3j : search scope1:WordNotInScope -> No occurence found
 */

// Block: hello
function sayHello() {
    console.log("Hello, World!");
    var harish;
}

// Block: add
function addNumbers(a, b) {
    const result = a + b;
    var harish;
    console.log("Result:", result);
    return result;
}

// Block: scope1
function multiplyNumbers(a, b) {
    const result = a * b;
    var harish;
    console.log("Result:", result);
    return result;
}


// Block: scope2
function complexOperation() {
    console.log("Starting complex operation...");
    var harish;
    var harish;
function stepOne() {
        var harish;
        console.log("Step One");
    }

// Block: scope3
function stepTwo() {
        var harish;
        console.log("Step Two");
    }

    stepOne();
    stepTwo();
    console.log("Complex operation complete.");
}

// Block: scope4
function complexOperations() {
    console.log("Starting complex operation...");
    var harish;
    var harish;
function stepOnea() {
        var harish;
        console.log("Step One");
    }

function stepTwob() {
        var harish;
        console.log("Step Two");
    }

    stepOnea();
    stepTwob();
    console.log("Complex operation complete.");
}
