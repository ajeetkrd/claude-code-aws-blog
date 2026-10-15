export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="bg-gradient-aws rounded-2xl text-center py-12 px-8 animate-fadeInScale">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fadeInUp">
            Build AI-Powered Applications with Claude Code on AWS
          </h1>
          <p className="text-xl text-white mb-8 animate-fadeInUp-delay-1">
            Learn how to leverage Claude Code with AWS Bedrock to build intelligent applications.
            Discover integration patterns, MCP servers, CI/CD workflows, and industry best practices
            for AI-powered development.
          </p>
          <a
            href="https://aws.amazon.com/bedrock/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-aws-dark text-white px-6 py-3 rounded-lg font-semibold animate-fadeInUp-delay-2"
          >
            Explore AWS Bedrock
          </a>
        </div>
      </section>

      {/* Post List - Students will build this in Exercise 006 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        <div className="text-aws-dark-gray">
          <p>Post list will be added in Exercise 006</p>
        </div>
      </section>
    </div>
  );
}
