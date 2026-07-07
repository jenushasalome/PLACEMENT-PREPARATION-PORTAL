import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import CodingProblem from "../models/CodingProblem.js";

dotenv.config();

connectDB();

const problems = [
    {
  title: "Solve Me First",
  difficulty: "Easy",
  topic: "Warm Up",
  points: 10,
  description: "Read two integers and print their sum.",
  inputFormat: "Two integers.",
  outputFormat: "Print their sum.",
  constraints: "0 ≤ a,b ≤ 1000",
  sampleInput: "2\n3",
  sampleOutput: "5",
  explanation: "2 + 3 = 5",
  starterCode: {
    java: "import java.util.*;\npublic class Main {\n public static void main(String[] args){\n Scanner sc=new Scanner(System.in);\n }\n}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "2\n3", output: "5" },
    { input: "10\n20", output: "30" },
    { input: "100\n200", output: "300" }
  ]
},

{
  title: "Print Hello World",
  difficulty: "Easy",
  topic: "Basics",
  points: 10,
  description: "Print Hello World.",
  inputFormat: "No Input",
  outputFormat: "Hello World",
  constraints: "-",
  sampleInput: "",
  sampleOutput: "Hello World",
  explanation: "Simply print Hello World.",
  starterCode: {
    java: "public class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "", output: "Hello World" }
  ]
},

{
  title: "Multiply Two Numbers",
  difficulty: "Easy",
  topic: "Math",
  points: 10,
  description: "Read two integers and print their product.",
  inputFormat: "Two integers",
  outputFormat: "Their product",
  constraints: "0≤a,b≤1000",
  sampleInput: "4\n5",
  sampleOutput: "20",
  explanation: "4×5=20",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "4\n5", output: "20" },
    { input: "8\n2", output: "16" }
  ]
},

{
  title: "Area of Rectangle",
  difficulty: "Easy",
  topic: "Math",
  points: 10,
  description: "Find the area of a rectangle.",
  inputFormat: "Length and breadth",
  outputFormat: "Area",
  constraints: "1≤l,b≤1000",
  sampleInput: "5\n4",
  sampleOutput: "20",
  explanation: "Area=l*b",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "5\n4", output: "20" },
    { input: "8\n9", output: "72" }
  ]
},

{
  title: "Even or Odd",
  difficulty: "Easy",
  topic: "Conditional",
  points: 15,
  description: "Determine whether a number is even or odd.",
  inputFormat: "One integer",
  outputFormat: "Even or Odd",
  constraints: "1≤n≤100000",
  sampleInput: "8",
  sampleOutput: "Even",
  explanation: "8 is divisible by 2.",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "8", output: "Even" },
    { input: "5", output: "Odd" }
  ]
},

{
  title: "Greatest of Two Numbers",
  difficulty: "Easy",
  topic: "Conditional",
  points: 15,
  description: "Print the greater number.",
  inputFormat: "Two integers",
  outputFormat: "Greater integer",
  constraints: "-",
  sampleInput: "5\n8",
  sampleOutput: "8",
  explanation: "8 is greater.",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "5\n8", output: "8" },
    { input: "20\n11", output: "20" }
  ]
},

{
  title: "Simple Interest",
  difficulty: "Easy",
  topic: "Math",
  points: 15,
  description: "Calculate Simple Interest.",
  inputFormat: "P T R",
  outputFormat: "SI",
  constraints: "-",
  sampleInput: "1000\n2\n10",
  sampleOutput: "200",
  explanation: "SI=(PTR)/100",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "1000\n2\n10", output: "200" },
    { input: "500\n4\n5", output: "100" }
  ]
},

{
  title: "Swap Two Numbers",
  difficulty: "Easy",
  topic: "Basics",
  points: 15,
  description: "Swap two integers.",
  inputFormat: "Two integers",
  outputFormat: "Swapped numbers",
  constraints: "-",
  sampleInput: "5\n8",
  sampleOutput: "8 5",
  explanation: "Swap values.",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "5\n8", output: "8 5" },
    { input: "20\n10", output: "10 20" }
  ]
},

{
  title: "Average of Three Numbers",
  difficulty: "Easy",
  topic: "Math",
  points: 20,
  description: "Find the average of three integers.",
  inputFormat: "Three integers",
  outputFormat: "Average",
  constraints: "-",
  sampleInput: "2\n4\n6",
  sampleOutput: "4",
  explanation: "(2+4+6)/3=4",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "2\n4\n6", output: "4" },
    { input: "3\n6\n9", output: "6" }
  ]
},

{
  title: "Maximum of Three Numbers",
  difficulty: "Easy",
  topic: "Conditional",
  points: 20,
  description: "Find the largest among three numbers.",
  inputFormat: "Three integers",
  outputFormat: "Largest number",
  constraints: "-",
  sampleInput: "5\n9\n2",
  sampleOutput: "9",
  explanation: "9 is largest.",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "5\n9\n2", output: "9" },
    { input: "11\n6\n20", output: "20" }
  ]
},
{
  title: "Factorial of a Number",
  difficulty: "Easy",
  topic: "Loops",
  points: 20,
  description: "Find the factorial of a given number.",
  inputFormat: "One integer N",
  outputFormat: "Factorial of N",
  constraints: "0 ≤ N ≤ 12",
  sampleInput: "5",
  sampleOutput: "120",
  explanation: "5×4×3×2×1 = 120",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "5", output: "120" },
    { input: "6", output: "720" }
  ]
},

{
  title: "Sum of N Natural Numbers",
  difficulty: "Easy",
  topic: "Loops",
  points: 20,
  description: "Find the sum of first N natural numbers.",
  inputFormat: "One integer N",
  outputFormat: "Sum",
  constraints: "1≤N≤1000",
  sampleInput: "5",
  sampleOutput: "15",
  explanation: "1+2+3+4+5=15",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5",output:"15"},
    {input:"10",output:"55"}
  ]
},

{
  title: "Palindrome Number",
  difficulty: "Easy",
  topic: "Math",
  points: 20,
  description: "Check whether a number is palindrome.",
  inputFormat: "One integer",
  outputFormat: "Palindrome or Not Palindrome",
  constraints: "-",
  sampleInput: "121",
  sampleOutput: "Palindrome",
  explanation: "121 reversed is 121.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"121",output:"Palindrome"},
    {input:"234",output:"Not Palindrome"}
  ]
},

{
  title: "Reverse Number",
  difficulty: "Easy",
  topic: "Math",
  points: 20,
  description: "Reverse the digits of a number.",
  inputFormat: "One integer",
  outputFormat: "Reversed integer",
  constraints: "-",
  sampleInput: "1234",
  sampleOutput: "4321",
  explanation: "Digits are reversed.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"1234",output:"4321"},
    {input:"500",output:"5"}
  ]
},

{
  title: "Count Digits",
  difficulty: "Easy",
  topic: "Math",
  points: 20,
  description: "Count the number of digits in a number.",
  inputFormat: "One integer",
  outputFormat: "Digit count",
  constraints: "-",
  sampleInput: "12345",
  sampleOutput: "5",
  explanation: "There are 5 digits.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"12345",output:"5"},
    {input:"9",output:"1"}
  ]
},

{
  title: "Sum of Digits",
  difficulty: "Easy",
  topic: "Math",
  points: 20,
  description: "Find the sum of digits.",
  inputFormat: "One integer",
  outputFormat: "Sum of digits",
  constraints: "-",
  sampleInput: "1234",
  sampleOutput: "10",
  explanation: "1+2+3+4=10",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"1234",output:"10"},
    {input:"999",output:"27"}
  ]
},

{
  title: "Prime Number",
  difficulty: "Easy",
  topic: "Math",
  points: 25,
  description: "Check whether a number is prime.",
  inputFormat: "One integer",
  outputFormat: "Prime or Not Prime",
  constraints: "2≤N≤100000",
  sampleInput: "11",
  sampleOutput: "Prime",
  explanation: "11 has only two factors.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"11",output:"Prime"},
    {input:"15",output:"Not Prime"}
  ]
},

{
  title: "Fibonacci Series",
  difficulty: "Easy",
  topic: "Loops",
  points: 25,
  description: "Print first N Fibonacci numbers.",
  inputFormat: "One integer N",
  outputFormat: "Fibonacci series",
  constraints: "1≤N≤20",
  sampleInput: "5",
  sampleOutput: "0 1 1 2 3",
  explanation: "Standard Fibonacci sequence.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5",output:"0 1 1 2 3"},
    {input:"7",output:"0 1 1 2 3 5 8"}
  ]
},

{
  title: "LCM of Two Numbers",
  difficulty: "Easy",
  topic: "Math",
  points: 25,
  description: "Find LCM of two numbers.",
  inputFormat: "Two integers",
  outputFormat: "LCM",
  constraints: "-",
  sampleInput: "4\n6",
  sampleOutput: "12",
  explanation: "LCM of 4 and 6 is 12.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"4\n6",output:"12"},
    {input:"10\n20",output:"20"}
  ]
},

{
  title: "GCD of Two Numbers",
  difficulty: "Easy",
  topic: "Math",
  points: 25,
  description: "Find GCD of two integers.",
  inputFormat: "Two integers",
  outputFormat: "GCD",
  constraints: "-",
  sampleInput: "20\n30",
  sampleOutput: "10",
  explanation: "Greatest common divisor is 10.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"20\n30",output:"10"},
    {input:"12\n18",output:"6"}
  ]
},
{
  title: "Armstrong Number",
  difficulty: "Easy",
  topic: "Math",
  points: 30,
  description: "Check whether a number is an Armstrong number.",
  inputFormat: "One integer",
  outputFormat: "Armstrong or Not Armstrong",
  constraints: "0 ≤ N ≤ 999",
  sampleInput: "153",
  sampleOutput: "Armstrong",
  explanation: "1³ + 5³ + 3³ = 153",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "153", output: "Armstrong" },
    { input: "125", output: "Not Armstrong" }
  ]
},

{
  title: "Leap Year",
  difficulty: "Easy",
  topic: "Conditional",
  points: 20,
  description: "Determine whether a year is leap year.",
  inputFormat: "One integer",
  outputFormat: "Leap Year or Not Leap Year",
  constraints: "1900 ≤ year ≤ 3000",
  sampleInput: "2024",
  sampleOutput: "Leap Year",
  explanation: "2024 is divisible by 4.",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "2024", output: "Leap Year" },
    { input: "2023", output: "Not Leap Year" }
  ]
},

{
  title: "Power of Number",
  difficulty: "Easy",
  topic: "Math",
  points: 30,
  description: "Find a raised to the power b.",
  inputFormat: "Base and exponent",
  outputFormat: "Result",
  constraints: "0≤a≤20,0≤b≤10",
  sampleInput: "2\n5",
  sampleOutput: "32",
  explanation: "2⁵ = 32",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "2\n5", output: "32" },
    { input: "3\n4", output: "81" }
  ]
},

{
  title: "ASCII Value",
  difficulty: "Easy",
  topic: "Characters",
  points: 20,
  description: "Print ASCII value of a character.",
  inputFormat: "One character",
  outputFormat: "ASCII value",
  constraints: "-",
  sampleInput: "A",
  sampleOutput: "65",
  explanation: "ASCII of A is 65.",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "A", output: "65" },
    { input: "a", output: "97" }
  ]
},

{
  title: "Character is Alphabet",
  difficulty: "Easy",
  topic: "Characters",
  points: 20,
  description: "Check whether input character is alphabet.",
  inputFormat: "One character",
  outputFormat: "Alphabet or Not Alphabet",
  constraints: "-",
  sampleInput: "A",
  sampleOutput: "Alphabet",
  explanation: "A is alphabet.",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "A", output: "Alphabet" },
    { input: "9", output: "Not Alphabet" }
  ]
},

{
  title: "Count Vowels",
  difficulty: "Easy",
  topic: "Strings",
  points: 30,
  description: "Count vowels in a string.",
  inputFormat: "One string",
  outputFormat: "Number of vowels",
  constraints: "Length ≤ 100",
  sampleInput: "education",
  sampleOutput: "5",
  explanation: "Vowels are e,u,a,i,o.",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "education", output: "5" },
    { input: "hello", output: "2" }
  ]
},

{
  title: "String Length",
  difficulty: "Easy",
  topic: "Strings",
  points: 20,
  description: "Find length of a string.",
  inputFormat: "One string",
  outputFormat: "Length",
  constraints: "Length ≤ 500",
  sampleInput: "Placement",
  sampleOutput: "9",
  explanation: "Placement has 9 letters.",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "Placement", output: "9" },
    { input: "ChatGPT", output: "7" }
  ]
},

{
  title: "Reverse String",
  difficulty: "Easy",
  topic: "Strings",
  points: 30,
  description: "Reverse the given string.",
  inputFormat: "One string",
  outputFormat: "Reversed string",
  constraints: "Length ≤ 100",
  sampleInput: "hello",
  sampleOutput: "olleh",
  explanation: "Characters reversed.",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "hello", output: "olleh" },
    { input: "abcd", output: "dcba" }
  ]
},

{
  title: "Palindrome String",
  difficulty: "Easy",
  topic: "Strings",
  points: 30,
  description: "Check whether a string is palindrome.",
  inputFormat: "One string",
  outputFormat: "Palindrome or Not Palindrome",
  constraints: "Length ≤ 100",
  sampleInput: "madam",
  sampleOutput: "Palindrome",
  explanation: "madam reversed is madam.",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "madam", output: "Palindrome" },
    { input: "hello", output: "Not Palindrome" }
  ]
},

{
  title: "Largest Element in Array",
  difficulty: "Easy",
  topic: "Arrays",
  points: 30,
  description: "Find the largest element in an array.",
  inputFormat: "N followed by N integers",
  outputFormat: "Largest element",
  constraints: "1 ≤ N ≤ 100",
  sampleInput: "5\n2 7 4 9 1",
  sampleOutput: "9",
  explanation: "9 is the maximum.",
  starterCode: {
    java: "import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python: "",
    cpp: "#include<iostream>\nusing namespace std;\nint main(){\n}",
    c: "#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases: [
    { input: "5\n2 7 4 9 1", output: "9" },
    { input: "4\n8 6 12 5", output: "12" }
  ]
},
{
  title: "Smallest Element in Array",
  difficulty: "Easy",
  topic: "Arrays",
  points: 30,
  description: "Find the smallest element in an array.",
  inputFormat: "N followed by N integers",
  outputFormat: "Smallest element",
  constraints: "1 ≤ N ≤ 100",
  sampleInput: "5\n8 2 7 1 5",
  sampleOutput: "1",
  explanation: "1 is the minimum element.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n8 2 7 1 5",output:"1"},
    {input:"4\n9 6 2 8",output:"2"}
  ]
},

{
  title:"Sum of Array",
  difficulty:"Easy",
  topic:"Arrays",
  points:30,
  description:"Find the sum of all array elements.",
  inputFormat:"N followed by N integers",
  outputFormat:"Sum",
  constraints:"1 ≤ N ≤ 100",
  sampleInput:"5\n1 2 3 4 5",
  sampleOutput:"15",
  explanation:"1+2+3+4+5 = 15",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n1 2 3 4 5",output:"15"},
    {input:"3\n10 20 30",output:"60"}
  ]
},

{
  title:"Average of Array",
  difficulty:"Easy",
  topic:"Arrays",
  points:30,
  description:"Find average of array elements.",
  inputFormat:"N followed by N integers",
  outputFormat:"Average",
  constraints:"1 ≤ N ≤ 100",
  sampleInput:"5\n2 4 6 8 10",
  sampleOutput:"6",
  explanation:"30/5 = 6",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n2 4 6 8 10",output:"6"},
    {input:"4\n5 5 5 5",output:"5"}
  ]
},

{
  title:"Search Element",
  difficulty:"Easy",
  topic:"Arrays",
  points:35,
  description:"Check whether a number exists in an array.",
  inputFormat:"N, array elements and target",
  outputFormat:"Found or Not Found",
  constraints:"1 ≤ N ≤ 100",
  sampleInput:"5\n2 4 6 8 10\n6",
  sampleOutput:"Found",
  explanation:"6 exists in array.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n2 4 6 8 10\n6",output:"Found"},
    {input:"3\n5 7 9\n4",output:"Not Found"}
  ]
},

{
  title:"Count Even Numbers",
  difficulty:"Easy",
  topic:"Arrays",
  points:35,
  description:"Count even numbers in an array.",
  inputFormat:"N followed by array",
  outputFormat:"Count",
  constraints:"1 ≤ N ≤ 100",
  sampleInput:"5\n2 3 4 5 6",
  sampleOutput:"3",
  explanation:"2,4,6 are even.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n2 3 4 5 6",output:"3"},
    {input:"4\n1 3 5 7",output:"0"}
  ]
},

{
  title:"Count Odd Numbers",
  difficulty:"Easy",
  topic:"Arrays",
  points:35,
  description:"Count odd numbers in an array.",
  inputFormat:"N followed by array",
  outputFormat:"Count",
  constraints:"1 ≤ N ≤ 100",
  sampleInput:"5\n2 3 4 5 6",
  sampleOutput:"2",
  explanation:"3 and 5 are odd.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n2 3 4 5 6",output:"2"},
    {input:"4\n1 3 5 7",output:"4"}
  ]
},

{
  title:"Second Largest Element",
  difficulty:"Easy",
  topic:"Arrays",
  points:40,
  description:"Find the second largest element.",
  inputFormat:"N followed by array",
  outputFormat:"Second largest",
  constraints:"1 ≤ N ≤ 100",
  sampleInput:"5\n4 8 2 9 5",
  sampleOutput:"8",
  explanation:"Largest is 9, second largest is 8.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n4 8 2 9 5",output:"8"},
    {input:"4\n10 20 15 5",output:"15"}
  ]
},

{
  title:"Reverse Array",
  difficulty:"Easy",
  topic:"Arrays",
  points:35,
  description:"Print array in reverse order.",
  inputFormat:"N followed by array",
  outputFormat:"Reversed array",
  constraints:"1 ≤ N ≤ 100",
  sampleInput:"5\n1 2 3 4 5",
  sampleOutput:"5 4 3 2 1",
  explanation:"Reverse order.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n1 2 3 4 5",output:"5 4 3 2 1"},
    {input:"3\n7 8 9",output:"9 8 7"}
  ]
},

{
  title:"Maximum Difference",
  difficulty:"Medium",
  topic:"Arrays",
  points:50,
  description:"Find difference between maximum and minimum element.",
  inputFormat:"N followed by array",
  outputFormat:"Difference",
  constraints:"1 ≤ N ≤ 100",
  sampleInput:"5\n3 9 1 7 5",
  sampleOutput:"8",
  explanation:"9-1 = 8",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n3 9 1 7 5",output:"8"},
    {input:"4\n20 15 30 10",output:"20"}
  ]
},

{
  title:"Array Sorted Check",
  difficulty:"Medium",
  topic:"Arrays",
  points:50,
  description:"Check whether array is sorted in ascending order.",
  inputFormat:"N followed by array",
  outputFormat:"Sorted or Not Sorted",
  constraints:"1 ≤ N ≤ 100",
  sampleInput:"5\n1 2 3 4 5",
  sampleOutput:"Sorted",
  explanation:"Elements are in increasing order.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n1 2 3 4 5",output:"Sorted"},
    {input:"5\n5 4 3 2 1",output:"Not Sorted"}
  ]
},
{
  title: "Convert to Uppercase",
  difficulty: "Easy",
  topic: "Strings",
  points: 30,
  description: "Convert a string to uppercase.",
  inputFormat: "One string",
  outputFormat: "Uppercase string",
  constraints: "Length ≤ 100",
  sampleInput: "hello",
  sampleOutput: "HELLO",
  explanation: "All lowercase letters become uppercase.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"hello",output:"HELLO"},
    {input:"Placement",output:"PLACEMENT"}
  ]
},

{
  title: "Convert to Lowercase",
  difficulty: "Easy",
  topic: "Strings",
  points: 30,
  description: "Convert a string to lowercase.",
  inputFormat: "One string",
  outputFormat: "Lowercase string",
  constraints: "Length ≤ 100",
  sampleInput: "HELLO",
  sampleOutput: "hello",
  explanation: "All uppercase letters become lowercase.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"HELLO",output:"hello"},
    {input:"JAVA",output:"java"}
  ]
},

{
  title: "Count Words",
  difficulty: "Easy",
  topic: "Strings",
  points: 35,
  description: "Count the number of words in a sentence.",
  inputFormat: "One sentence",
  outputFormat: "Word count",
  constraints: "Length ≤ 200",
  sampleInput: "I love programming",
  sampleOutput: "3",
  explanation: "Three words are present.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"I love programming",output:"3"},
    {input:"Hello World",output:"2"}
  ]
},

{
  title: "Remove Spaces",
  difficulty: "Easy",
  topic: "Strings",
  points: 35,
  description: "Remove all spaces from a string.",
  inputFormat: "One string",
  outputFormat: "String without spaces",
  constraints: "Length ≤ 200",
  sampleInput: "Hello World",
  sampleOutput: "HelloWorld",
  explanation: "Spaces are removed.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"Hello World",output:"HelloWorld"},
    {input:"Placement Portal",output:"PlacementPortal"}
  ]
},

{
  title: "Concatenate Strings",
  difficulty: "Easy",
  topic: "Strings",
  points: 35,
  description: "Join two strings together.",
  inputFormat: "Two strings",
  outputFormat: "Concatenated string",
  constraints: "Length ≤ 100",
  sampleInput: "Hello\nWorld",
  sampleOutput: "HelloWorld",
  explanation: "Strings are joined.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"Hello\nWorld",output:"HelloWorld"},
    {input:"Java\nProgramming",output:"JavaProgramming"}
  ]
},

{
  title: "Compare Strings",
  difficulty: "Easy",
  topic: "Strings",
  points: 40,
  description: "Check whether two strings are equal.",
  inputFormat: "Two strings",
  outputFormat: "Equal or Not Equal",
  constraints: "Length ≤ 100",
  sampleInput: "abc\nabc",
  sampleOutput: "Equal",
  explanation: "Both strings are same.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"abc\nabc",output:"Equal"},
    {input:"abc\nxyz",output:"Not Equal"}
  ]
},

{
  title: "Frequency of Character",
  difficulty: "Medium",
  topic: "Strings",
  points: 45,
  description: "Count frequency of a character in a string.",
  inputFormat: "String followed by character",
  outputFormat: "Frequency",
  constraints: "Length ≤ 100",
  sampleInput: "banana\na",
  sampleOutput: "3",
  explanation: "a appears three times.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"banana\na",output:"3"},
    {input:"hello\nl",output:"2"}
  ]
},

{
  title: "Count Digits in String",
  difficulty: "Medium",
  topic: "Strings",
  points: 45,
  description: "Count numeric digits in a string.",
  inputFormat: "One string",
  outputFormat: "Digit count",
  constraints: "Length ≤ 100",
  sampleInput: "abc123",
  sampleOutput: "3",
  explanation: "Digits are 1,2,3.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"abc123",output:"3"},
    {input:"hello2025",output:"4"}
  ]
},

{
  title: "Anagram Check",
  difficulty: "Medium",
  topic: "Strings",
  points: 50,
  description: "Check whether two strings are anagrams.",
  inputFormat: "Two strings",
  outputFormat: "Anagram or Not Anagram",
  constraints: "Length ≤ 100",
  sampleInput: "listen\nsilent",
  sampleOutput: "Anagram",
  explanation: "Both contain same characters.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"listen\nsilent",output:"Anagram"},
    {input:"hello\nworld",output:"Not Anagram"}
  ]
},

{
  title: "First Non-Repeating Character",
  difficulty: "Medium",
  topic: "Strings",
  points: 55,
  description: "Find the first non-repeating character in a string.",
  inputFormat: "One string",
  outputFormat: "Character",
  constraints: "Length ≤ 100",
  sampleInput: "swiss",
  sampleOutput: "w",
  explanation: "w appears only once.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"swiss",output:"w"},
    {input:"aabbcdde",output:"c"}
  ]
},
{
  title: "Linear Search",
  difficulty: "Easy",
  topic: "Searching",
  points: 40,
  description: "Find whether a given element exists in an array using linear search.",
  inputFormat: "N, array elements, target",
  outputFormat: "Found or Not Found",
  constraints: "1 ≤ N ≤ 100",
  sampleInput: "5\n2 5 8 1 9\n8",
  sampleOutput: "Found",
  explanation: "8 exists in the array.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n2 5 8 1 9\n8",output:"Found"},
    {input:"4\n1 2 3 4\n9",output:"Not Found"}
  ]
},

{
  title:"Binary Search",
  difficulty:"Medium",
  topic:"Searching",
  points:60,
  description:"Find an element using binary search.",
  inputFormat:"N, sorted array, target",
  outputFormat:"Index or -1",
  constraints:"1 ≤ N ≤ 1000",
  sampleInput:"5\n2 4 6 8 10\n8",
  sampleOutput:"3",
  explanation:"8 is at index 3.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n2 4 6 8 10\n8",output:"3"},
    {input:"5\n2 4 6 8 10\n5",output:"-1"}
  ]
},

{
  title:"Find Missing Number",
  difficulty:"Medium",
  topic:"Arrays",
  points:60,
  description:"Find the missing number from 1 to N.",
  inputFormat:"N followed by N-1 numbers",
  outputFormat:"Missing number",
  constraints:"1 ≤ N ≤ 1000",
  sampleInput:"5\n1 2 4 5",
  sampleOutput:"3",
  explanation:"3 is missing.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n1 2 4 5",output:"3"},
    {input:"4\n2 3 4",output:"1"}
  ]
},

{
  title:"First Occurrence",
  difficulty:"Medium",
  topic:"Searching",
  points:60,
  description:"Find first occurrence of an element.",
  inputFormat:"N, array, target",
  outputFormat:"Index",
  constraints:"1 ≤ N ≤ 100",
  sampleInput:"6\n2 4 5 5 5 8\n5",
  sampleOutput:"2",
  explanation:"First occurrence of 5 is at index 2.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"6\n2 4 5 5 5 8\n5",output:"2"},
    {input:"4\n1 2 3 4\n7",output:"-1"}
  ]
},

{
  title:"Last Occurrence",
  difficulty:"Medium",
  topic:"Searching",
  points:60,
  description:"Find last occurrence of an element.",
  inputFormat:"N, array, target",
  outputFormat:"Index",
  constraints:"1 ≤ N ≤ 100",
  sampleInput:"6\n2 4 5 5 5 8\n5",
  sampleOutput:"4",
  explanation:"Last occurrence is index 4.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"6\n2 4 5 5 5 8\n5",output:"4"},
    {input:"5\n1 2 3 4 5\n9",output:"-1"}
  ]
},

{
  title:"Peak Element",
  difficulty:"Medium",
  topic:"Arrays",
  points:70,
  description:"Find any peak element in the array.",
  inputFormat:"N followed by array",
  outputFormat:"Peak element",
  constraints:"1 ≤ N ≤ 100",
  sampleInput:"5\n1 3 8 4 2",
  sampleOutput:"8",
  explanation:"8 is greater than neighbours.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n1 3 8 4 2",output:"8"},
    {input:"5\n5 4 3 2 1",output:"5"}
  ]
},

{
  title:"Count Occurrences",
  difficulty:"Medium",
  topic:"Searching",
  points:60,
  description:"Count occurrences of an element.",
  inputFormat:"N, array, target",
  outputFormat:"Count",
  constraints:"1 ≤ N ≤ 100",
  sampleInput:"6\n2 3 3 3 5 6\n3",
  sampleOutput:"3",
  explanation:"3 occurs three times.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"6\n2 3 3 3 5 6\n3",output:"3"},
    {input:"5\n1 2 3 4 5\n6",output:"0"}
  ]
},

{
  title:"Find Duplicate",
  difficulty:"Medium",
  topic:"Arrays",
  points:70,
  description:"Find duplicate number in an array.",
  inputFormat:"N followed by array",
  outputFormat:"Duplicate number",
  constraints:"2 ≤ N ≤ 100",
  sampleInput:"5\n1 3 4 2 3",
  sampleOutput:"3",
  explanation:"3 appears twice.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n1 3 4 2 3",output:"3"},
    {input:"6\n2 1 5 6 4 2",output:"2"}
  ]
},

{
  title:"Find Unique Element",
  difficulty:"Medium",
  topic:"Arrays",
  points:70,
  description:"Find the element occurring only once.",
  inputFormat:"N followed by array",
  outputFormat:"Unique element",
  constraints:"1 ≤ N ≤ 100",
  sampleInput:"5\n2 3 2 4 4",
  sampleOutput:"3",
  explanation:"3 appears once.",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n2 3 2 4 4",output:"3"},
    {input:"7\n5 5 7 8 8 9 9",output:"7"}
  ]
},

{
  title:"Maximum Subarray Sum",
  difficulty:"Medium",
  topic:"Arrays",
  points:80,
  description:"Find maximum sum of contiguous subarray.",
  inputFormat:"N followed by array",
  outputFormat:"Maximum sum",
  constraints:"1 ≤ N ≤ 1000",
  sampleInput:"5\n-2 1 -3 4 5",
  sampleOutput:"9",
  explanation:"4+5 = 9",
  starterCode:{
    java:"import java.util.*;\npublic class Main{public static void main(String[] args){}}",
    python:"",
    cpp:"#include<iostream>\nusing namespace std;\nint main(){\n}",
    c:"#include<stdio.h>\nint main(){\n}"
  },
  hiddenTestCases:[
    {input:"5\n-2 1 -3 4 5",output:"9"},
    {input:"5\n1 2 3 4 5",output:"15"}
  ]
},
{
title: "Find Maximum Element",
difficulty: "Easy",
topic: "Arrays",
points: 20,

description:
"Given an array of N integers, print the maximum element.",

inputFormat:
"First line contains N.\nSecond line contains N integers.",

outputFormat:
"Print the maximum element.",

constraints:
"1 ≤ N ≤ 1000",

sampleInput:
`5
2 8 1 6 4`,

sampleOutput:
`8`,

explanation:
"8 is the largest element.",

starterCode:{
java:``,
python:``,
cpp:``,
c:``
},

hiddenTestCases:[
{input:`5
2 8 1 6 4`,output:"8"},
{input:`4
10 20 30 5`,output:"30"},
{input:`3
7 7 7`,output:"7"}
]
},

{
title:"Find Minimum Element",
difficulty:"Easy",
topic:"Arrays",
points:20,

description:
"Print the minimum element of an array.",

inputFormat:
"First line N.\nSecond line N integers.",

outputFormat:
"Print minimum value.",

constraints:
"1 ≤ N ≤ 1000",

sampleInput:
`5
8 3 6 9 1`,

sampleOutput:
`1`,

explanation:
"1 is smallest.",

starterCode:{
java:``,
python:``,
cpp:``,
c:``
},

hiddenTestCases:[
{input:`5
8 3 6 9 1`,output:"1"},
{input:`4
5 4 3 2`,output:"2"},
{input:`2
100 50`,output:"50"}
]
},

{
title:"Array Sum",
difficulty:"Easy",
topic:"Arrays",
points:20,

description:
"Print the sum of all array elements.",

inputFormat:
"N followed by N integers.",

outputFormat:
"Print sum.",

constraints:
"1 ≤ N ≤ 1000",

sampleInput:
`4
1 2 3 4`,

sampleOutput:
`10`,

explanation:
"1+2+3+4 = 10",

starterCode:{
java:``,
python:``,
cpp:``,
c:``
},

hiddenTestCases:[
{input:`4
1 2 3 4`,output:"10"},
{input:`3
5 5 5`,output:"15"},
{input:`5
2 2 2 2 2`,output:"10"}
]
},

{
title:"Count Even Numbers",
difficulty:"Easy",
topic:"Arrays",
points:20,

description:
"Count even numbers in an array.",

inputFormat:
"N then N integers.",

outputFormat:
"Print count.",

constraints:
"1 ≤ N ≤ 1000",

sampleInput:
`5
2 5 6 7 8`,

sampleOutput:
`3`,

explanation:
"2,6,8 are even.",

starterCode:{
java:``,
python:``,
cpp:``,
c:``
},

hiddenTestCases:[
{input:`5
2 5 6 7 8`,output:"3"},
{input:`4
1 3 5 7`,output:"0"},
{input:`6
2 4 6 8 10 12`,output:"6"}
]
},

{
title:"Count Odd Numbers",
difficulty:"Easy",
topic:"Arrays",
points:20,

description:
"Count odd numbers.",

inputFormat:
"N then array.",

outputFormat:
"Print count.",

constraints:
"1 ≤ N ≤ 1000",

sampleInput:
`5
1 2 3 4 5`,

sampleOutput:
`3`,

explanation:
"1,3,5 are odd.",

starterCode:{
java:``,
python:``,
cpp:``,
c:``
},

hiddenTestCases:[
{input:`5
1 2 3 4 5`,output:"3"},
{input:`4
2 4 6 8`,output:"0"},
{input:`3
9 7 5`,output:"3"}
]
},
{
  title: "Binary Search",
  difficulty: "Medium",
  topic: "Searching",
  points: 80,

  description:
    "Given a sorted array and a target value, return its index. Return -1 if not found.",

  inputFormat:
    "First line contains n.\nSecond line contains n sorted integers.\nThird line contains target.",

  outputFormat:
    "Print index of target, otherwise -1.",

  constraints:
    "1 ≤ n ≤ 100000",

  sampleInput:
`5
1 3 5 7 9
7`,

  sampleOutput:
`3`,

  explanation:
    "7 exists at index 3.",

  starterCode: {

java:
`import java.util.*;

public class Main{

    public static void main(String[] args){

        Scanner sc=new Scanner(System.in);

        int n=sc.nextInt();

        int arr[]=new int[n];

        for(int i=0;i<n;i++)
            arr[i]=sc.nextInt();

        int target=sc.nextInt();

        int low=0,high=n-1;

        while(low<=high){

            int mid=(low+high)/2;

            if(arr[mid]==target){

                System.out.print(mid);
                return;

            }

            if(arr[mid]<target)
                low=mid+1;
            else
                high=mid-1;

        }

        System.out.print(-1);

    }

}`,

python:
`n=int(input())

arr=list(map(int,input().split()))

target=int(input())

low=0
high=n-1

while low<=high:

    mid=(low+high)//2

    if arr[mid]==target:
        print(mid)
        exit()

    if arr[mid]<target:
        low=mid+1
    else:
        high=mid-1

print(-1)`,

cpp:
`#include<iostream>
#include<vector>
using namespace std;

int main(){

    int n;
    cin>>n;

    vector<int> arr(n);

    for(int i=0;i<n;i++)
        cin>>arr[i];

    int target;
    cin>>target;

    int low=0,high=n-1;

    while(low<=high){

        int mid=(low+high)/2;

        if(arr[mid]==target){

            cout<<mid;
            return 0;

        }

        if(arr[mid]<target)
            low=mid+1;
        else
            high=mid-1;

    }

    cout<<-1;

}`,

c:
`#include<stdio.h>

int main(){

    int n;
    scanf("%d",&n);

    int arr[n];

    for(int i=0;i<n;i++)
        scanf("%d",&arr[i]);

    int target;
    scanf("%d",&target);

    int low=0,high=n-1;

    while(low<=high){

        int mid=(low+high)/2;

        if(arr[mid]==target){

            printf("%d",mid);
            return 0;

        }

        if(arr[mid]<target)
            low=mid+1;
        else
            high=mid-1;

    }

    printf("-1");

    return 0;

}`
  },

  hiddenTestCases: [

    {
      input:
`5
1 3 5 7 9
7`,
      output: "3"
    },

    {
      input:
`4
2 4 6 8
5`,
      output: "-1"
    },

    {
      input:
`6
10 20 30 40 50 60
60`,
      output: "5"
    }

  ]
},
{
  title: "Merge Two Sorted Arrays",

  difficulty: "Medium",

  topic: "Arrays",

  points: 90,

  description:
    "Given two sorted arrays, merge them into a single sorted array.",

  inputFormat:
    "First line contains n.\nSecond line contains n sorted integers.\nThird line contains m.\nFourth line contains m sorted integers.",

  outputFormat:
    "Print the merged sorted array separated by spaces.",

  constraints:
    "1 ≤ n,m ≤ 1000",

  sampleInput:
`3
1 3 5
4
2 4 6 8`,

  sampleOutput:
`1 2 3 4 5 6 8`,

  explanation:
    "Merge both arrays while maintaining sorted order.",

  starterCode: {

java:
`import java.util.*;

public class Main{

    public static void main(String[] args){

        Scanner sc=new Scanner(System.in);

        int n=sc.nextInt();

        int a[]=new int[n];

        for(int i=0;i<n;i++)
            a[i]=sc.nextInt();

        int m=sc.nextInt();

        int b[]=new int[m];

        for(int i=0;i<m;i++)
            b[i]=sc.nextInt();

        int i=0,j=0;

        while(i<n && j<m){

            if(a[i]<=b[j])
                System.out.print(a[i++]+" ");
            else
                System.out.print(b[j++]+" ");

        }

        while(i<n)
            System.out.print(a[i++]+" ");

        while(j<m)
            System.out.print(b[j++]+" ");

    }

}`,

python:
`n=int(input())

a=list(map(int,input().split()))

m=int(input())

b=list(map(int,input().split()))

i=j=0

while i<n and j<m:

    if a[i]<=b[j]:
        print(a[i],end=" ")
        i+=1
    else:
        print(b[j],end=" ")
        j+=1

while i<n:
    print(a[i],end=" ")
    i+=1

while j<m:
    print(b[j],end=" ")
    j+=1`,

cpp:
`#include<iostream>
#include<vector>
using namespace std;

int main(){

    int n;
    cin>>n;

    vector<int>a(n);

    for(int i=0;i<n;i++)
        cin>>a[i];

    int m;
    cin>>m;

    vector<int>b(m);

    for(int i=0;i<m;i++)
        cin>>b[i];

    int i=0,j=0;

    while(i<n && j<m){

        if(a[i]<=b[j])
            cout<<a[i++]<<" ";
        else
            cout<<b[j++]<<" ";

    }

    while(i<n)
        cout<<a[i++]<<" ";

    while(j<m)
        cout<<b[j++]<<" ";

}`,

c:
`#include<stdio.h>

int main(){

    int n;
    scanf("%d",&n);

    int a[n];

    for(int i=0;i<n;i++)
        scanf("%d",&a[i]);

    int m;
    scanf("%d",&m);

    int b[m];

    for(int i=0;i<m;i++)
        scanf("%d",&b[i]);

    int i=0,j=0;

    while(i<n && j<m){

        if(a[i]<=b[j])
            printf("%d ",a[i++]);
        else
            printf("%d ",b[j++]);

    }

    while(i<n)
        printf("%d ",a[i++]);

    while(j<m)
        printf("%d ",b[j++]);

    return 0;

}`
  },

  hiddenTestCases: [

    {
      input:
`3
1 3 5
4
2 4 6 8`,
      output: "1 2 3 4 5 6 8"
    },

    {
      input:
`2
5 6
3
1 2 3`,
      output: "1 2 3 5 6"
    },

    {
      input:
`4
1 2 3 4
1
5`,
      output: "1 2 3 4 5"
    }

  ]
},
{
  title: "Bubble Sort",

  difficulty: "Easy",

  topic: "Sorting",

  points: 100,

  description:
    "Given an array of integers, sort the array in ascending order using Bubble Sort.",

  inputFormat:
    "First line contains integer n.\nSecond line contains n space separated integers.",

  outputFormat:
    "Print the sorted array separated by spaces.",

  constraints:
    "1 ≤ n ≤ 1000",

  sampleInput:
`5
5 2 4 1 3`,

  sampleOutput:
`1 2 3 4 5`,

  explanation:
    "Bubble Sort repeatedly swaps adjacent elements if they are in the wrong order.",

  starterCode: {

java:
`import java.util.*;

public class Main{

    public static void main(String[] args){

        Scanner sc=new Scanner(System.in);

        int n=sc.nextInt();

        int arr[]=new int[n];

        for(int i=0;i<n;i++)
            arr[i]=sc.nextInt();

        for(int i=0;i<n-1;i++){

            for(int j=0;j<n-i-1;j++){

                if(arr[j]>arr[j+1]){

                    int temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;

                }

            }

        }

        for(int x:arr)
            System.out.print(x+" ");

    }

}`,

python:
`n=int(input())

arr=list(map(int,input().split()))

for i in range(n-1):

    for j in range(n-i-1):

        if arr[j]>arr[j+1]:

            arr[j],arr[j+1]=arr[j+1],arr[j]

print(*arr)`,

cpp:
`#include<iostream>
using namespace std;

int main(){

    int n;
    cin>>n;

    int arr[n];

    for(int i=0;i<n;i++)
        cin>>arr[i];

    for(int i=0;i<n-1;i++){

        for(int j=0;j<n-i-1;j++){

            if(arr[j]>arr[j+1]){

                int temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;

            }

        }

    }

    for(int i=0;i<n;i++)
        cout<<arr[i]<<" ";

}`,

c:
`#include<stdio.h>

int main(){

    int n;
    scanf("%d",&n);

    int arr[n];

    for(int i=0;i<n;i++)
        scanf("%d",&arr[i]);

    for(int i=0;i<n-1;i++){

        for(int j=0;j<n-i-1;j++){

            if(arr[j]>arr[j+1]){

                int temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;

            }

        }

    }

    for(int i=0;i<n;i++)
        printf("%d ",arr[i]);

    return 0;

}`
  },

  hiddenTestCases: [

    {
      input:
`5
5 2 4 1 3`,
      output: "1 2 3 4 5"
    },

    {
      input:
`4
9 7 5 3`,
      output: "3 5 7 9"
    },

    {
      input:
`6
1 2 3 4 5 6`,
      output: "1 2 3 4 5 6"
    }

  ]
},
{
  title: "Selection Sort",

  difficulty: "Easy",

  topic: "Sorting",

  points: 110,

  description:
    "Given an array of integers, sort the array in ascending order using Selection Sort.",

  inputFormat:
    "First line contains integer n.\nSecond line contains n space separated integers.",

  outputFormat:
    "Print the sorted array separated by spaces.",

  constraints:
    "1 ≤ n ≤ 1000",

  sampleInput:
`5
64 25 12 22 11`,

  sampleOutput:
`11 12 22 25 64`,

  explanation:
    "Selection Sort repeatedly selects the smallest remaining element and places it at its correct position.",

  starterCode: {

java:
`import java.util.*;

public class Main{

    public static void main(String[] args){

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        int arr[] = new int[n];

        for(int i=0;i<n;i++)
            arr[i]=sc.nextInt();

        for(int i=0;i<n-1;i++){

            int min=i;

            for(int j=i+1;j<n;j++){

                if(arr[j]<arr[min])
                    min=j;

            }

            int temp=arr[min];
            arr[min]=arr[i];
            arr[i]=temp;

        }

        for(int x:arr)
            System.out.print(x+" ");

    }

}`,

python:
`n=int(input())

arr=list(map(int,input().split()))

for i in range(n-1):

    minimum=i

    for j in range(i+1,n):

        if arr[j]<arr[minimum]:

            minimum=j

    arr[i],arr[minimum]=arr[minimum],arr[i]

print(*arr)`,

cpp:
`#include<iostream>
using namespace std;

int main(){

    int n;
    cin>>n;

    int arr[n];

    for(int i=0;i<n;i++)
        cin>>arr[i];

    for(int i=0;i<n-1;i++){

        int minimum=i;

        for(int j=i+1;j<n;j++){

            if(arr[j]<arr[minimum])
                minimum=j;

        }

        int temp=arr[i];
        arr[i]=arr[minimum];
        arr[minimum]=temp;

    }

    for(int i=0;i<n;i++)
        cout<<arr[i]<<" ";

}`,

c:
`#include<stdio.h>

int main(){

    int n;
    scanf("%d",&n);

    int arr[n];

    for(int i=0;i<n;i++)
        scanf("%d",&arr[i]);

    for(int i=0;i<n-1;i++){

        int minimum=i;

        for(int j=i+1;j<n;j++){

            if(arr[j]<arr[minimum])
                minimum=j;

        }

        int temp=arr[i];
        arr[i]=arr[minimum];
        arr[minimum]=temp;

    }

    for(int i=0;i<n;i++)
        printf("%d ",arr[i]);

    return 0;

}`
  },

  hiddenTestCases: [

    {
      input:
`5
64 25 12 22 11`,
      output:"11 12 22 25 64"
    },

    {
      input:
`4
4 3 2 1`,
      output:"1 2 3 4"
    },

    {
      input:
`6
1 2 3 4 5 6`,
      output:"1 2 3 4 5 6"
    }

  ]
},

];
const seedCodingProblems = async () => {

    try {

        await CodingProblem.deleteMany();

        await CodingProblem.insertMany(problems);

        console.log("100 Coding Problems Inserted");

        process.exit();

    }

    catch(err){

        console.log(err);

        process.exit(1);

    }

};

seedCodingProblems();