import React from 'react';
import { plannerData } from '../data/planner';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Calendar, Clock, Target, Plus, Circle } from 'lucide-react';

const Planner = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Study Planner</h1>
          <p className="text-gray-500 mt-1">Organize your study schedule and track goals</p>
        </div>
        <Button variant="primary" icon={Plus} size="md">
          Add Task
        </Button>
      </div>

      {/* Study Goals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary-50 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-primary-600" />
            </div>
            <span className="text-sm text-gray-500">Daily Goal</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{plannerData.studyGoals.daily}h</p>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
            <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }} />
          </div>
          <p className="text-xs text-gray-500 mt-2">4.5h completed today</p>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-success-50 p-2 rounded-lg">
              <Target className="w-5 h-5 text-success-600" />
            </div>
            <span className="text-sm text-gray-500">Weekly Goal</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{plannerData.studyGoals.weekly}h</p>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
            <div className="bg-success-500 h-2 rounded-full" style={{ width: '85%' }} />
          </div>
          <p className="text-xs text-gray-500 mt-2">34h completed this week</p>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-50 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">Monthly Goal</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{plannerData.studyGoals.monthly}h</p>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '65%' }} />
          </div>
          <p className="text-xs text-gray-500 mt-2">104h completed this month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Schedule */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h2>
          <div className="space-y-3">
            {plannerData.weeklySchedule.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900">{day.day}</p>
                    <Badge variant="primary" size="sm">{day.hours}h</Badge>
                  </div>
                  <p className="text-sm text-gray-500">{day.topics.join(', ')}</p>
                </div>
                <Circle className="w-5 h-5 text-gray-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
          <div className="space-y-3">
            {plannerData.upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-1">{deadline.task}</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{deadline.dueDate}</span>
                  </div>
                </div>
                <Badge
                  variant={deadline.priority === 'high' ? 'error' : deadline.priority === 'medium' ? 'warning' : 'success'}
                  size="sm"
                >
                  {deadline.priority}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Timeline */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Timeline</h2>
        <div className="space-y-4">
          {[
            { time: '9:00 AM', task: 'DS: Binary Trees', duration: '2h', completed: true },
            { time: '11:00 AM', task: 'Algo: Dynamic Programming', duration: '2h', completed: true },
            { time: '2:00 PM', task: 'DBMS: Normalization', duration: '1.5h', completed: false },
            { time: '4:00 PM', task: 'Practice Questions', duration: '1h', completed: false },
            { time: '6:00 PM', task: 'Revision', duration: '1h', completed: false },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${item.completed ? 'bg-success-500' : 'bg-gray-300'}`} />
                {index < 4 && <div className="w-0.5 h-16 bg-gray-200" />}
              </div>
              <div className={`flex-1 p-4 rounded-lg ${item.completed ? 'bg-success-50' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{item.time}</span>
                  <Badge variant={item.completed ? 'success' : 'neutral'} size="sm">
                    {item.duration}
                  </Badge>
                </div>
                <p className={`font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                  {item.task}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner;
