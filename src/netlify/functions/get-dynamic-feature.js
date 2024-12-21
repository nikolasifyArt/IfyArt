exports.handler = async function (event, context) {
  // Simulate dynamic feature retrieval
  const dynamicFeatures = [
    {
      icon: "🌐",
      title: "Cloud Integration",
      description: "Seamless connectivity with major cloud platforms.",
    },
    {
      icon: "🤖",
      title: "AI Powered",
      description: "Intelligent automation and machine learning capabilities.",
    },
  ];

  // Randomly select a feature
  const randomFeature =
    dynamicFeatures[Math.floor(Math.random() * dynamicFeatures.length)];

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(randomFeature),
  };
};
