import {
  ArrowRight,
  Database,
  Code,
  Cpu,
  Settings,
  Server,
  Network,
  Brain,
  FileCode,
  Calculator,
  Target,
  Microchip,
} from "lucide-react";
import { Link } from "react-router-dom";

const iconMap = {
  Database,
  Code,
  Cpu,
  Settings,
  Server,
  Network,
  Brain,
  FileCode,
  Calculator,
  Target,
  Microchip,
};

function SubjectCard({ subject }) {
  if (!subject) return null;

  const Icon = iconMap[subject.icon] || Database;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      
      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${
            subject.color || "bg-blue-500"
          } text-white shadow-sm`}
        >
          <Icon size={24} />
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {subject.difficulty || "Medium"}
        </span>
      </div>

      {/* Subject Name */}
      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        {subject.name}
      </h3>

      {/* Description */}
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
        {subject.description ||
          "Prepare this subject for GATE CS/IT."}
      </p>

      {/* Progress */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-500">
            Progress
          </span>

          <span className="font-semibold text-slate-900">
            {subject.progress || 0}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{
              width: `${subject.progress || 0}%`,
            }}
          />
        </div>
      </div>

      {/* Topics */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-slate-500">
          {subject.topicsCompleted || 0} /{" "}
          {subject.totalTopics || 0} topics
        </span>

        <span className="text-xs text-slate-400">
          {subject.lastStudied || "Not studied yet"}
        </span>
      </div>

      {/* Action */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <Link
          to={`/subjects/${subject.slug}`}
          className="flex items-center justify-between font-medium text-blue-600 transition-colors hover:text-blue-800"
        >
          <span>View Topics</span>

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}

export default SubjectCard;