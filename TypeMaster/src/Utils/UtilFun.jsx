import React, { useState, useEffect, useRef } from 'react';
import { Clock, Home, Download, Trophy, RefreshCw, Play, Eye } from 'lucide-react';


// Utility Functions
export const calculateWPM = (characters, seconds) => {
  const minutes = seconds / 60;
  return Math.round((characters / 5) / minutes) || 0;
};

export const calculateAccuracy = (typed, reference) => {
  if (!typed || !reference) return 100;
  const minLength = Math.min(typed.length, reference.length);
  let correct = 0;
  for (let i = 0; i < minLength; i++) {
    if (typed[i] === reference[i]) correct++;
  }
  return Math.round((correct / reference.length) * 100);
};

export const compareWords = (typed, script) => {
  const typedWords = typed.trim().toLowerCase().split(/\s+/);
  const scriptWords = script.trim().toLowerCase().split(/\s+/);
  
  let matched = 0;
  const mismatches = [];
  
  for (let i = 0; i < scriptWords.length; i++) {
    if (typedWords[i] === scriptWords[i]) {
      matched++;
    } else {
      mismatches.push({
        expected: scriptWords[i],
        typed: typedWords[i] || '(missing)'
      });
    }
  }
  
  return {
    matched,
    totalWords: scriptWords.length,
    percentage: Math.round((matched / scriptWords.length) * 100),
    mismatches
  };
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const exportToCSV = () => {
  const results = JSON.parse(localStorage.getItem('typingResults') || '[]');
  if (results.length === 0) {
    alert('No results to export!');
    return;
  }
  
  const headers = ['Date', 'Mode', 'WPM', 'Accuracy', 'Characters', 'Time'];
  const rows = results.map(r => [
    new Date(r.timestamp).toLocaleString(),
    r.mode,
    r.wpm,
    r.accuracy === 'N/A' ? 'N/A' : r.accuracy + '%',
    r.characters,
    r.timeTaken + 's'
  ]);
  
  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `typing-results-${Date.now()}.csv`;
  a.click();
};
