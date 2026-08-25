import React from 'react';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Layers,
  Flame
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';

const LEARNING_MODULES = [
  {
    skill: "Machine Learning Foundations",
    hours: 28,
    difficulty: "Intermediate",
    tagline: "From baseline regression to state-of-the-art gradient boosted ensembles.",
    topics: [
      { name: "Supervised Learning Fundamentals", desc: "Linear & Logistic regression, decision boundaries, cost functions" },
      { name: "Tree-Based Models & Ensembles", desc: "Random Forests, XGBoost, LightGBM, CatBoost with GPU tuning" },
      { name: "Feature Engineering & Preprocessing", desc: "Target encoding, categorical embeddings, outlier management" },
      { name: "Model Evaluation & Metrics", desc: "Precision-Recall tradeoffs, ROC-AUC, calibration curves, cross-validation" },
      { name: "Unsupervised Clustering & PCA", desc: "K-Means, DBSCAN, t-SNE, UMAP dimensionality reduction" },
      { name: "Hyperparameter Optimization", desc: "Bayesian optimization with Optuna and grid exploration" }
    ]
  },
  {
    skill: "Deep Learning & Neural Architectures",
    hours: 36,
    difficulty: "Advanced",
    tagline: "PyTorch deep dive, Convolutional Networks, and Transformer mechanics.",
    topics: [
      { name: "Deep Neural Networks (PyTorch Core)", desc: "Custom nn.Module, autograd tensors, custom loss formulations" },
      { name: "Computer Vision with CNNs & ViTs", desc: "ResNet, Vision Transformers, transfer learning, data augmentation" },
      { name: "NLP & Transformer Attention", desc: "Self-attention matrix math, multi-head attention, tokenization" },
      { name: "Hugging Face Ecosystem", desc: "Transformers, Datasets, PEFT LoRA fine-tuning pipelines" },
      { name: "Explainable AI (XAI)", desc: "SHAP, LIME, Grad-CAM attention visualizations" }
    ]
  },
  {
    skill: "Advanced Statistics & Probability for Data Science",
    hours: 22,
    difficulty: "Intermediate",
    tagline: "Rigorous mathematical inference, A/B testing, and Bayesian reasoning.",
    topics: [
      { name: "Probability Distributions", desc: "Gaussian, Binomial, Poisson, Central Limit Theorem mechanics" },
      { name: "Hypothesis Testing & Experimentation", desc: "Z-Tests, T-Tests, ANOVA, Chi-Square contingency testing" },
      { name: "A/B Testing & Sequential Sampling", desc: "MDE calculations, power analysis, FDR correction" },
      { name: "Bayesian Inference", desc: "Prior distributions, likelihood updating, Markov Chain Monte Carlo" },
      { name: "Regression Diagnostics", desc: "Heteroskedasticity, multicollinearity VIF, Cook's distance" }
    ]
  },
  {
    skill: "Modern SQL & Analytics Engineering",
    hours: 24,
    difficulty: "Intermediate",
    tagline: "Complex window functions, CTEs, and relational dimensional modeling.",
    topics: [
      { name: "Window Functions Mastery", desc: "RANK, DENSE_RANK, ROW_NUMBER, LAG, LEAD, NTILE partitions" },
      { name: "Recursive CTEs & Complex Subqueries", desc: "Hierarchical data traversal and multi-step data transformations" },
      { name: "Dimensional Modeling (Kimball)", desc: "Star and Snowflake schemas, Fact and Dimension tables" },
      { name: "Query Execution Optimization", desc: "EXPLAIN ANALYZE, indexing strategies, partition pruning" }
    ]
  }
];

export const LearningPage: React.FC = () => {
  const { targetRole } = useCareer();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div>
        <span className="text-xs uppercase tracking-wider font-extrabold text-teal-600 dark:text-teal-400 flex items-center space-x-1">
          <GraduationCap className="w-3.5 h-3.5 mr-1" /> Structured Curricula
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Recommended Learning Paths
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          Curated step-by-step topic checklists designed to eliminate skill gaps for <strong className="text-teal-600 dark:text-teal-400">{targetRole}</strong>.
        </p>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {LEARNING_MODULES.map((mod, idx) => (
          <div key={idx} className="p-6 sm:p-8 rounded-3xl glass-card border hover:border-teal-500/40 transition">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  Module 0{idx + 1}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {mod.skill}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {mod.tagline}
                </p>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <span className="flex items-center text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5 mr-1 text-teal-500" />
                  Estimated: {mod.hours} Hours
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                  {mod.difficulty}
                </span>
              </div>
            </div>

            {/* Subtopics Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
              {mod.topics.map((top, tIdx) => (
                <div
                  key={tIdx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80"
                >
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {top.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        {top.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
