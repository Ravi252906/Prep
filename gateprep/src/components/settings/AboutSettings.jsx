import React from "react";
import {
  Info,
  BookOpen,
  MessageCircle,
  Shield,
  FileText,
  Mail,
} from "lucide-react";
import Button from "../ui/Button";

const AboutSettings = () => {
  const appInfo = {
    name: "GATEPrep",
    version: "1.0.0",
    description:
      "A comprehensive GATE CS/IT preparation platform with practice questions, mock tests, analytics, and study planning tools.",
    techStack: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "React Router DOM",
      "Lucide React",
      "Recharts",
    ],
  };

  const handleHelp = () => {
    window.open("#", "_blank");
  };

  const handleFeedback = () => {
    window.open("#", "_blank");
  };

  const handlePrivacyPolicy = () => {
    window.open("#", "_blank");
  };

  const handleTermsOfUse = () => {
    window.open("#", "_blank");
  };

  const handleContact = () => {
    window.open("mailto:support@gateprep.com", "_blank");
  };

  return (
    <div className="space-y-6">
      {/* About GATEPrep */}
      <div className="card p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-slate-100">
          About GATEPrep
        </h2>

        {/* App Info */}
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600">
            <BookOpen className="h-8 w-8 text-white" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
              {appInfo.name}
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              Version {appInfo.version}
            </p>

            <p className="mt-2 max-w-lg text-gray-600 dark:text-slate-300">
              {appInfo.description}
            </p>
          </div>
        </div>

        {/* Technology Stack */}
        <div>
          <h4 className="mb-3 font-medium text-gray-900 dark:text-slate-100">
            Technology Stack
          </h4>

          <div className="flex flex-wrap gap-2">
            {appInfo.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-slate-700 dark:text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Support & Resources */}
      <div className="card p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-slate-100">
          Support & Resources
        </h2>

        <div className="space-y-3">
          <Button
            variant="secondary"
            size="md"
            icon={MessageCircle}
            onClick={handleHelp}
            className="w-full justify-start"
          >
            Help Center
          </Button>

          <Button
            variant="secondary"
            size="md"
            icon={MessageCircle}
            onClick={handleFeedback}
            className="w-full justify-start"
          >
            Send Feedback
          </Button>

          <Button
            variant="secondary"
            size="md"
            icon={Shield}
            onClick={handlePrivacyPolicy}
            className="w-full justify-start"
          >
            Privacy Policy
          </Button>

          <Button
            variant="secondary"
            size="md"
            icon={FileText}
            onClick={handleTermsOfUse}
            className="w-full justify-start"
          >
            Terms of Use
          </Button>

          <Button
            variant="secondary"
            size="md"
            icon={Mail}
            onClick={handleContact}
            className="w-full justify-start"
          >
            Contact Us
          </Button>
        </div>
      </div>

      {/* Frontend Demo Notice */}
      <div className="card border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/30">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-300">
              Frontend Demo
            </h3>

            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              This is a frontend-only demonstration. All data is stored
              locally in your browser. No backend, database, or external
              services are connected at this stage.
            </p>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="card border-gray-200 bg-gray-50 p-6 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-3 font-medium text-gray-900 dark:text-slate-100">
          Legal
        </h3>

        <p className="text-sm text-gray-600 dark:text-slate-300">
          GATEPrep is an educational preparation tool and is not affiliated
          with IITs, IISc, or GATE conducting authorities. GATE is a
          registered trademark of the Indian Institute of Technology,
          Kharagpur.
        </p>
      </div>
    </div>
  );
};

export default AboutSettings;