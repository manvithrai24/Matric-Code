
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface IssueType {
  id: string;
  line: number;
  column: number;
  severity: 'error' | 'warning' | 'info';
  message: string;
  rule: string;
}

interface ReportProps {
  isLoading: boolean;
  score: number;
  issues: IssueType[];
}

const Report: React.FC<ReportProps> = ({ isLoading, score, issues }) => {
  const errorsCount = issues.filter(issue => issue.severity === 'error').length;
  const warningsCount = issues.filter(issue => issue.severity === 'warning').length;
  const infoCount = issues.filter(issue => issue.severity === 'info').length;
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'bg-analyzer-error text-white';
      case 'warning':
        return 'bg-analyzer-warning text-white';
      case 'info':
        return 'bg-analyzer-info text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-analyzer-success';
    if (score >= 70) return 'text-analyzer-warning';
    return 'text-analyzer-error';
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Analysis Report</CardTitle>
          <CardDescription>
            {isLoading ? 'Analyzing code...' : 'Analysis completed'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Code Quality Score</span>
                <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}%</span>
              </div>
              <Progress value={score} className="h-2" />
            </div>
            
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="bg-analyzer-error text-white">
                {errorsCount} Errors
              </Badge>
              <Badge variant="outline" className="bg-analyzer-warning text-white">
                {warningsCount} Warnings
              </Badge>
              <Badge variant="outline" className="bg-analyzer-info text-white">
                {infoCount} Info
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Issues ({issues.length})</TabsTrigger>
          <TabsTrigger value="errors">Errors ({errorsCount})</TabsTrigger>
          <TabsTrigger value="warnings">Warnings ({warningsCount})</TabsTrigger>
          <TabsTrigger value="info">Info ({infoCount})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <IssuesList issues={issues} />
        </TabsContent>
        
        <TabsContent value="errors" className="mt-4">
          <IssuesList issues={issues.filter(issue => issue.severity === 'error')} />
        </TabsContent>
        
        <TabsContent value="warnings" className="mt-4">
          <IssuesList issues={issues.filter(issue => issue.severity === 'warning')} />
        </TabsContent>
        
        <TabsContent value="info" className="mt-4">
          <IssuesList issues={issues.filter(issue => issue.severity === 'info')} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const IssuesList: React.FC<{ issues: IssueType[] }> = ({ issues }) => {
  if (issues.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No issues found in this category.</p>
      </div>
    );
  }

  // Fixed: Add the getSeverityColor function here as well
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'bg-analyzer-error text-white';
      case 'warning':
        return 'bg-analyzer-warning text-white';
      case 'info':
        return 'bg-analyzer-info text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-2">
      {issues.map((issue) => (
        <Card key={issue.id} className="overflow-hidden">
          <div className={`h-1 ${issue.severity === 'error' ? 'bg-analyzer-error' : issue.severity === 'warning' ? 'bg-analyzer-warning' : 'bg-analyzer-info'}`} />
          <CardContent className="pt-4">
            <div className="flex items-start space-x-4">
              <Badge className={getSeverityColor(issue.severity)} variant="outline">
                {issue.severity.toUpperCase()}
              </Badge>
              <div className="flex-1">
                <p className="font-medium">{issue.message}</p>
                <div className="text-sm text-gray-500 mt-1">
                  <span>Line {issue.line}, Column {issue.column}</span>
                  <span className="mx-2">•</span>
                  <span>Rule: {issue.rule}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Report;
