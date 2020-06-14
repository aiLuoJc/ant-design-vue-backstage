module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  // 以spec 结尾的走单元测试
  testMatch: ["**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"],
  testURL: "http://localhost/",
  // 是否测试覆盖率的收集 （一般在特殊环境中才生产测试报告）
  collectCoverage: process.env.COVERAGE === "true",
  // 将那些文件列入进来，作为测试报告的基础数据
  collectCoverageFrom: ["src/**/*.{js,vue}", "!**/node_modules/**"]
};
