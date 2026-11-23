export const formulaSections = [
  {
    id: "properties",
    icon: "≡",
    title: "Properties of Definite Integrals",
    color: "#3b82f6",
    groups: [
      {
        heading: "Fundamental Properties",
        rows: [
          {
            tex: "\\displaystyle\\int_a^a f(x)\\,\\d x = 0",
            name: "Zero-width interval",
            note: "Integrating over a single point gives zero.",
          },
          {
            tex: "\\displaystyle\\int_a^b f(x)\\,\\d x = -\\int_b^a f(x)\\,\\d x",
            name: "Reversal of limits",
            note: "Swapping bounds negates the integral.",
          },
          {
            tex: "\\displaystyle\\int_a^b c\\,f(x)\\,\\d x = c\\int_a^b f(x)\\,\\d x",
            name: "Constant multiple",
            note: "Constants factor out of the integral.",
          },
          {
            tex: "\\displaystyle\\int_a^b [f(x)\\pm g(x)]\\,\\d x = \\int_a^b f(x)\\,\\d x \\pm \\int_a^b g(x)\\,\\d x",
            name: "Sum / Difference",
            note: "Integration is linear.",
          },
          {
            tex: "\\displaystyle\\int_a^b f(x)\\,\\d x = \\int_a^c f(x)\\,\\d x + \\int_c^b f(x)\\,\\d x",
            name: "Interval additivity",
            note: "Valid for any c, even outside [a, b].",
          },
        ],
      },
      {
        heading: "Comparison & Bound Properties",
        rows: [
          {
            tex: "f(x)\\ge 0\\text{ on }[a,b]\\;\\Rightarrow\\;\\displaystyle\\int_a^b f(x)\\,\\d x\\ge 0",
            name: "Non-negativity",
            note: "",
          },
          {
            tex: "f(x)\\ge g(x)\\text{ on }[a,b]\\;\\Rightarrow\\;\\displaystyle\\int_a^b f\\,\\d x\\ge\\int_a^b g\\,\\d x",
            name: "Monotonicity",
            note: "",
          },
          {
            tex: "\\displaystyle\\left|\\int_a^b f(x)\\,\\d x\\right|\\le\\int_a^b |f(x)|\\,\\d x",
            name: "Triangle inequality",
            note: "",
          },
          {
            tex: "m(b-a)\\le\\displaystyle\\int_a^b f(x)\\,\\d x\\le M(b-a)",
            name: "Bound estimate",
            note: "Where m = min f, M = max f on [a, b].",
          },
        ],
      },
      {
        heading: "Symmetry Properties",
        rows: [
          {
            tex: "f\\text{ even}\\;\\Rightarrow\\;\\displaystyle\\int_{-a}^{a} f(x)\\,\\d x = 2\\int_0^a f(x)\\,\\d x",
            name: "Even function",
            note: "f(−x) = f(x), e.g. x², cos(x).",
          },
          {
            tex: "f\\text{ odd}\\;\\Rightarrow\\;\\displaystyle\\int_{-a}^{a} f(x)\\,\\d x = 0",
            name: "Odd function",
            note: "f(−x) = −f(x), e.g. x, sin(x), x³.",
          },
          {
            tex: "f\\text{ periodic (period }T\\text{)}\\;\\Rightarrow\\;\\displaystyle\\int_0^T f\\,\\d x = \\int_a^{a+T} f\\,\\d x",
            name: "Periodicity",
            note: "Integral over one full period is translation-invariant.",
          },
        ],
      },
      {
        heading: "Fundamental Theorem of Calculus",
        rows: [
          {
            tex: "F(x)=\\displaystyle\\int_a^x f(t)\\,\\d t\\;\\Rightarrow\\;F'(x)=f(x)",
            name: "FTC Part 1",
            note: "Differentiation undoes integration.",
          },
          {
            tex: "\\displaystyle\\int_a^b f(x)\\,\\d x = F(b)-F(a),\\quad F'=f",
            name: "FTC Part 2",
            note: "Use antiderivative evaluated at bounds.",
          },
          {
            tex: "\\dfrac{\\d}{\\d x}\\displaystyle\\int_a^{g(x)} f(t)\\,\\d t = f(g(x))\\cdot g'(x)",
            name: "Leibniz rule (chain)",
            note: "Differentiate integral with variable upper limit.",
          },
        ],
      },
      {
        heading: "Mean Value Theorem for Integrals",
        rows: [
          {
            tex: "\\exists\\, c\\in(a,b):\\quad f(c)=\\dfrac{1}{b-a}\\displaystyle\\int_a^b f(x)\\,\\d x",
            name: "Mean Value Theorem",
            note: "f must be continuous on [a, b].",
          },
          {
            tex: "\\bar{f}=\\dfrac{1}{b-a}\\displaystyle\\int_a^b f(x)\\,\\d x",
            name: "Average value of f",
            note: "The mean value of f over [a, b].",
          },
        ],
      },
    ],
  },
  {
    id: "techniques",
    icon: "⚙",
    title: "Integration Techniques",
    color: "#8b5cf6",
    groups: [
      {
        heading: "u-Substitution",
        rows: [
          {
            tex: "\\displaystyle\\int f(g(x))\\,g'(x)\\,\\d x = \\int f(u)\\,\\d u,\\quad u=g(x)",
            name: "Substitution rule",
            note: "Choose u so that du = g′(x) dx appears in the integrand.",
          },
          {
            tex: "\\displaystyle\\int_a^b f(g(x))\\,g'(x)\\,\\d x = \\int_{g(a)}^{g(b)} f(u)\\,\\d u",
            name: "Definite substitution",
            note: "Change the bounds when substituting.",
          },
          {
            tex: "\\text{Example: }\\displaystyle\\int 2x\\cos(x^2)\\,\\d x\\xrightarrow{u=x^2}\\int\\cos u\\,\\d u=\\sin(x^2)+C",
            name: "Example",
            note: "",
          },
        ],
      },
      {
        heading: "Integration by Parts",
        rows: [
          {
            tex: "\\displaystyle\\int u\\,\\d v = uv - \\int v\\,\\d u",
            name: "IBP formula",
            note: "Derived from the product rule.",
          },
          {
            tex: "\\displaystyle\\int_a^b u\\,\\d v = \\Big[uv\\Big]_a^b - \\int_a^b v\\,\\d u",
            name: "Definite IBP",
            note: "",
          },
          {
            tex: "\\text{LIATE: }\\underbrace{\\ln}_{L}\\;\\underbrace{\\arcsin,\\arctan\\ldots}_{I}\\;\\underbrace{x^n}_{A}\\;\\underbrace{\\sin,\\cos}_{T}\\;\\underbrace{e^x}_{E}",
            name: "Choosing u (LIATE)",
            note: "Pick u from the left; dv is the remainder.",
          },
          {
            tex: "\\text{Example: }\\displaystyle\\int x e^x\\,\\d x = xe^x - e^x + C",
            name: "Example",
            note: "u = x, dv = eˣ dx.",
          },
        ],
      },
      {
        heading: "Trigonometric Integrals",
        rows: [
          {
            tex: "\\sin^2 x = \\dfrac{1-\\cos 2x}{2},\\qquad \\cos^2 x = \\dfrac{1+\\cos 2x}{2}",
            name: "Half-angle identities",
            note: "Essential for even powers of sin/cos.",
          },
          {
            tex: "\\displaystyle\\int\\sin^m x\\cos^n x\\,\\d x",
            name: "Strategy",
            note: "Odd m: save sin x, convert rest via sin²=1−cos². Odd n: save cos x. Both even: use half-angle.",
          },
          {
            tex: "\\tan^2 x = \\sec^2 x - 1\\qquad\\Rightarrow\\qquad\\displaystyle\\int\\tan^n x\\,\\d x\\text{ reduces}",
            name: "Powers of tan",
            note: "",
          },
          {
            tex: "\\displaystyle\\int\\sec^n x\\,\\d x:\\;n\\text{ even}\\to u=\\tan x;\\;n\\text{ odd}\\to\\text{IBP}",
            name: "Powers of sec",
            note: "",
          },
        ],
      },
      {
        heading: "Trigonometric Substitution",
        rows: [
          {
            tex: "\\sqrt{a^2-x^2}:\\quad x=a\\sin\\theta,\\;\\d x=a\\cos\\theta\\,\\d\\theta,\\;\\sqrt{a^2-x^2}=a\\cos\\theta",
            name: "Form √(a²−x²)",
            note: "θ ∈ [−π/2, π/2]",
          },
          {
            tex: "\\sqrt{a^2+x^2}:\\quad x=a\\tan\\theta,\\;\\d x=a\\sec^2\\theta\\,\\d\\theta,\\;\\sqrt{a^2+x^2}=a\\sec\\theta",
            name: "Form √(a²+x²)",
            note: "θ ∈ (−π/2, π/2)",
          },
          {
            tex: "\\sqrt{x^2-a^2}:\\quad x=a\\sec\\theta,\\;\\d x=a\\sec\\theta\\tan\\theta\\,\\d\\theta,\\;\\sqrt{x^2-a^2}=a\\tan\\theta",
            name: "Form √(x²−a²)",
            note: "θ ∈ [0, π/2)",
          },
        ],
      },
      {
        heading: "Partial Fractions",
        rows: [
          {
            tex: "\\dfrac{P(x)}{Q(x)},\\;\\deg P<\\deg Q:\\text{ factor }Q\\text{ into linear/quadratic factors}",
            name: "Setup",
            note: "If deg P ≥ deg Q, do polynomial long division first.",
          },
          {
            tex: "\\dfrac{1}{(x-a)(x-b)}=\\dfrac{A}{x-a}+\\dfrac{B}{x-b}",
            name: "Distinct linear factors",
            note: "Solve for A, B by substituting x = a and x = b.",
          },
          {
            tex: "\\dfrac{1}{(x-a)^2}=\\dfrac{A}{x-a}+\\dfrac{B}{(x-a)^2}",
            name: "Repeated linear factor",
            note: "Each power gets its own term.",
          },
          {
            tex: "\\dfrac{Ax+B}{x^2+bx+c}\\quad(\\text{irreducible quadratic})",
            name: "Irreducible quadratic",
            note: "Complete the square, then use arctan formula.",
          },
        ],
      },
      {
        heading: "Improper Integrals",
        rows: [
          {
            tex: "\\displaystyle\\int_a^{\\infty} f(x)\\,\\d x = \\lim_{t\\to\\infty}\\int_a^t f(x)\\,\\d x",
            name: "Infinite upper limit",
            note: "Converges if the limit exists and is finite.",
          },
          {
            tex: "\\displaystyle\\int_{-\\infty}^{\\infty} f\\,\\d x = \\int_{-\\infty}^c f\\,\\d x + \\int_c^{\\infty} f\\,\\d x",
            name: "Both limits infinite",
            note: "Both parts must converge independently.",
          },
          {
            tex: "\\displaystyle\\int_a^b f\\,\\d x\\;(f\\to\\infty\\text{ at }b):\\;=\\lim_{t\\to b^-}\\int_a^t f\\,\\d x",
            name: "Vertical asymptote at bound",
            note: "",
          },
          {
            tex: "\\displaystyle\\int_1^{\\infty}\\frac{\\d x}{x^p}\\text{ converges}\\iff p>1\\quad\\left(=\\frac{1}{p-1}\\right)",
            name: "p-test",
            note: "∫₀¹ 1/xᵖ dx converges iff p < 1.",
          },
        ],
      },
      {
        heading: "Numerical Integration",
        rows: [
          {
            tex: "\\displaystyle\\int_a^b f\\,\\d x\\approx\\frac{b-a}{n}\\sum_{i=1}^n f\\!\\left(\\frac{x_{i-1}+x_i}{2}\\right)",
            name: "Midpoint Rule",
            note: "Error O(h²).",
          },
          {
            tex: "\\displaystyle\\int_a^b f\\,\\d x\\approx\\frac{h}{2}\\left[f(x_0)+2f(x_1)+\\cdots+2f(x_{n-1})+f(x_n)\\right]",
            name: "Trapezoid Rule",
            note: "Error O(h²). h = (b−a)/n.",
          },
          {
            tex: "\\displaystyle\\int_a^b f\\,\\d x\\approx\\frac{h}{3}\\left[f(x_0)+4f(x_1)+2f(x_2)+\\cdots+4f(x_{n-1})+f(x_n)\\right]",
            name: "Simpson's Rule",
            note: "Error O(h⁴). n must be even. Used internally by this app.",
          },
        ],
      },
    ],
  },
  {
    id: "elementary",
    icon: "∫",
    title: "Elementary Integration Formulas",
    color: "#10b981",
    groups: [
      {
        heading: "Power & Polynomial",
        rows: [
          {
            tex: "\\displaystyle\\int x^n\\,\\d x = \\frac{x^{n+1}}{n+1}+C,\\quad n\\ne -1",
            name: "Power rule",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\frac{1}{x}\\,\\d x = \\ln|x|+C",
            name: "Reciprocal (n = −1)",
            note: "",
          },
          {
            tex: "\\displaystyle\\int k\\,\\d x = kx+C",
            name: "Constant",
            note: "",
          },
          {
            tex: "\\displaystyle\\int (ax+b)^n\\,\\d x = \\frac{(ax+b)^{n+1}}{a(n+1)}+C,\\quad n\\ne -1",
            name: "Linear power",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\frac{\\d x}{ax+b} = \\frac{1}{a}\\ln|ax+b|+C",
            name: "Linear reciprocal",
            note: "",
          },
        ],
      },
      {
        heading: "Exponential & Logarithm",
        rows: [
          {
            tex: "\\displaystyle\\int e^x\\,\\d x = e^x+C",
            name: "Natural exponential",
            note: "",
          },
          {
            tex: "\\displaystyle\\int e^{ax}\\,\\d x = \\frac{1}{a}e^{ax}+C",
            name: "Scaled exponential",
            note: "",
          },
          {
            tex: "\\displaystyle\\int a^x\\,\\d x = \\frac{a^x}{\\ln a}+C,\\quad a>0,\\,a\\ne 1",
            name: "General exponential",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\ln x\\,\\d x = x\\ln x - x+C",
            name: "Natural log",
            note: "IBP: u = ln x, dv = dx.",
          },
          {
            tex: "\\displaystyle\\int \\log_a x\\,\\d x = x\\log_a x - \\frac{x}{\\ln a}+C",
            name: "General log",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\frac{\\d x}{x\\ln x} = \\ln|\\ln x|+C",
            name: "Log of log",
            note: "u = ln x.",
          },
        ],
      },
      {
        heading: "Trigonometric",
        rows: [
          {
            tex: "\\displaystyle\\int \\sin x\\,\\d x = -\\cos x+C",
            name: "Sine",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\cos x\\,\\d x = \\sin x+C",
            name: "Cosine",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\tan x\\,\\d x = -\\ln|\\cos x|+C = \\ln|\\sec x|+C",
            name: "Tangent",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\cot x\\,\\d x = \\ln|\\sin x|+C",
            name: "Cotangent",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\sec x\\,\\d x = \\ln|\\sec x+\\tan x|+C",
            name: "Secant",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\csc x\\,\\d x = -\\ln|\\csc x+\\cot x|+C",
            name: "Cosecant",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\sec^2 x\\,\\d x = \\tan x+C",
            name: "Secant squared",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\csc^2 x\\,\\d x = -\\cot x+C",
            name: "Cosecant squared",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\sec x\\tan x\\,\\d x = \\sec x+C",
            name: "sec·tan",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\csc x\\cot x\\,\\d x = -\\csc x+C",
            name: "csc·cot",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\sin(ax)\\,\\d x = -\\frac{1}{a}\\cos(ax)+C",
            name: "Scaled sine",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\cos(ax)\\,\\d x = \\frac{1}{a}\\sin(ax)+C",
            name: "Scaled cosine",
            note: "",
          },
        ],
      },
      {
        heading: "Inverse Trigonometric",
        rows: [
          {
            tex: "\\displaystyle\\int \\frac{\\d x}{\\sqrt{1-x^2}} = \\arcsin x+C",
            name: "Arcsin",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\frac{-\\d x}{\\sqrt{1-x^2}} = \\arccos x+C",
            name: "Arccos",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\frac{\\d x}{1+x^2} = \\arctan x+C",
            name: "Arctan",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\frac{\\d x}{a^2+x^2} = \\frac{1}{a}\\arctan\\frac{x}{a}+C",
            name: "Scaled arctan",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\frac{\\d x}{\\sqrt{a^2-x^2}} = \\arcsin\\frac{x}{a}+C",
            name: "Scaled arcsin",
            note: "|x| < a",
          },
          {
            tex: "\\displaystyle\\int \\frac{\\d x}{x\\sqrt{x^2-a^2}} = \\frac{1}{a}\\operatorname{arcsec}\\frac{|x|}{a}+C",
            name: "Arcsec",
            note: "",
          },
        ],
      },
      {
        heading: "Hyperbolic",
        rows: [
          {
            tex: "\\displaystyle\\int \\sinh x\\,\\d x = \\cosh x+C",
            name: "Sinh",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\cosh x\\,\\d x = \\sinh x+C",
            name: "Cosh",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\tanh x\\,\\d x = \\ln(\\cosh x)+C",
            name: "Tanh",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\operatorname{sech}^2 x\\,\\d x = \\tanh x+C",
            name: "sech²",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\frac{\\d x}{\\sqrt{x^2+a^2}} = \\ln\\left|x+\\sqrt{x^2+a^2}\\right|+C = \\operatorname{arcsinh}\\frac{x}{a}+C",
            name: "Arcsinh form",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\frac{\\d x}{\\sqrt{x^2-a^2}} = \\ln\\left|x+\\sqrt{x^2-a^2}\\right|+C = \\operatorname{arccosh}\\frac{x}{a}+C",
            name: "Arccosh form",
            note: "|x| > a",
          },
        ],
      },
    ],
  },
  {
    id: "popular",
    icon: "★",
    title: "Popular Integration Formulas",
    color: "#f59e0b",
    groups: [
      {
        heading: "Rational Functions",
        rows: [
          {
            tex: "\\displaystyle\\int \\frac{\\d x}{x^2-a^2} = \\frac{1}{2a}\\ln\\left|\\frac{x-a}{x+a}\\right|+C",
            name: "Difference of squares",
            note: "|x| ≠ a",
          },
          {
            tex: "\\displaystyle\\int \\frac{\\d x}{a^2-x^2} = \\frac{1}{2a}\\ln\\left|\\frac{a+x}{a-x}\\right|+C",
            name: "Reversed difference",
            note: "|x| < a",
          },
          {
            tex: "\\displaystyle\\int \\frac{x\\,\\d x}{x^2+a^2} = \\frac{1}{2}\\ln(x^2+a^2)+C",
            name: "x over sum of squares",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\frac{\\d x}{(x^2+a^2)^2} = \\frac{x}{2a^2(x^2+a^2)}+\\frac{1}{2a^3}\\arctan\\frac{x}{a}+C",
            name: "Squared sum of squares",
            note: "",
          },
          {
            tex: "\\displaystyle\\int \\frac{x\\,\\d x}{(x+a)^2} = \\frac{a}{x+a}+\\ln|x+a|+C",
            name: "x over linear squared",
            note: "",
          },
        ],
      },
      {
        heading: "Square Root Forms",
        rows: [
          {
            tex: "\\displaystyle\\int\\sqrt{a^2-x^2}\\,\\d x = \\frac{x}{2}\\sqrt{a^2-x^2}+\\frac{a^2}{2}\\arcsin\\frac{x}{a}+C",
            name: "√(a²−x²)",
            note: "|x| ≤ a",
          },
          {
            tex: "\\displaystyle\\int\\sqrt{x^2+a^2}\\,\\d x = \\frac{x}{2}\\sqrt{x^2+a^2}+\\frac{a^2}{2}\\ln\\left|x+\\sqrt{x^2+a^2}\\right|+C",
            name: "√(x²+a²)",
            note: "",
          },
          {
            tex: "\\displaystyle\\int\\sqrt{x^2-a^2}\\,\\d x = \\frac{x}{2}\\sqrt{x^2-a^2}-\\frac{a^2}{2}\\ln\\left|x+\\sqrt{x^2-a^2}\\right|+C",
            name: "√(x²−a²)",
            note: "|x| ≥ a",
          },
          {
            tex: "\\displaystyle\\int x\\sqrt{a^2-x^2}\\,\\d x = -\\frac{1}{3}(a^2-x^2)^{3/2}+C",
            name: "x·√(a²−x²)",
            note: "",
          },
          {
            tex: "\\displaystyle\\int\\sqrt{x}\\,\\d x = \\frac{2}{3}x^{3/2}+C",
            name: "√x",
            note: "",
          },
          {
            tex: "\\displaystyle\\int\\frac{\\d x}{\\sqrt{x}} = 2\\sqrt{x}+C",
            name: "1/√x",
            note: "",
          },
        ],
      },
      {
        heading: "Exponential × Trigonometric",
        rows: [
          {
            tex: "\\displaystyle\\int e^{ax}\\sin(bx)\\,\\d x = \\frac{e^{ax}(a\\sin bx - b\\cos bx)}{a^2+b^2}+C",
            name: "eˣ · sin",
            note: "",
          },
          {
            tex: "\\displaystyle\\int e^{ax}\\cos(bx)\\,\\d x = \\frac{e^{ax}(a\\cos bx + b\\sin bx)}{a^2+b^2}+C",
            name: "eˣ · cos",
            note: "",
          },
          {
            tex: "\\displaystyle\\int x^n e^x\\,\\d x:\\text{ use tabular IBP (differentiate }x^n\\text{, integrate }e^x\\text{)}",
            name: "xⁿ eˣ",
            note: "n differentiations yield n+1 terms.",
          },
        ],
      },
      {
        heading: "Polynomial × Trigonometric",
        rows: [
          {
            tex: "\\displaystyle\\int x\\sin x\\,\\d x = \\sin x - x\\cos x+C",
            name: "x·sin x",
            note: "IBP: u = x, dv = sin x dx.",
          },
          {
            tex: "\\displaystyle\\int x\\cos x\\,\\d x = \\cos x + x\\sin x+C",
            name: "x·cos x",
            note: "IBP: u = x, dv = cos x dx.",
          },
          {
            tex: "\\displaystyle\\int x^2\\sin x\\,\\d x = 2x\\sin x-(x^2-2)\\cos x+C",
            name: "x²·sin x",
            note: "Tabular IBP.",
          },
          {
            tex: "\\displaystyle\\int x^2\\cos x\\,\\d x = 2x\\cos x+(x^2-2)\\sin x+C",
            name: "x²·cos x",
            note: "Tabular IBP.",
          },
        ],
      },
      {
        heading: "Polynomial × Logarithm",
        rows: [
          {
            tex: "\\displaystyle\\int \\ln x\\,\\d x = x\\ln x - x+C",
            name: "ln x",
            note: "",
          },
          {
            tex: "\\displaystyle\\int x\\ln x\\,\\d x = \\frac{x^2}{2}\\ln x - \\frac{x^2}{4}+C",
            name: "x·ln x",
            note: "",
          },
          {
            tex: "\\displaystyle\\int x^n\\ln x\\,\\d x = \\frac{x^{n+1}\\ln x}{n+1}-\\frac{x^{n+1}}{(n+1)^2}+C,\\quad n\\ne -1",
            name: "xⁿ·ln x",
            note: "",
          },
          {
            tex: "\\displaystyle\\int (\\ln x)^2\\,\\d x = x(\\ln x)^2 - 2x\\ln x + 2x+C",
            name: "ln²x",
            note: "Repeated IBP.",
          },
          {
            tex: "\\displaystyle\\int \\frac{\\ln x}{x}\\,\\d x = \\frac{1}{2}(\\ln x)^2+C",
            name: "ln x / x",
            note: "u = ln x.",
          },
        ],
      },
      {
        heading: "Classic Definite Integral Results",
        rows: [
          {
            tex: "\\displaystyle\\int_0^{\\infty} e^{-x^2}\\,\\d x = \\frac{\\sqrt{\\pi}}{2}\\quad(\\text{Gaussian})",
            name: "Gaussian integral",
            note: "Requires polar coordinates to prove.",
          },
          {
            tex: "\\displaystyle\\int_0^{\\infty} e^{-ax^2}\\,\\d x = \\frac{1}{2}\\sqrt{\\frac{\\pi}{a}},\\quad a>0",
            name: "Scaled Gaussian",
            note: "",
          },
          {
            tex: "\\displaystyle\\int_0^{\\infty}\\frac{\\sin x}{x}\\,\\d x = \\frac{\\pi}{2}\\quad(\\text{Dirichlet})",
            name: "Dirichlet integral",
            note: "Improper but convergent.",
          },
          {
            tex: "\\displaystyle\\int_0^{\\pi/2}\\sin^2 x\\,\\d x = \\int_0^{\\pi/2}\\cos^2 x\\,\\d x = \\frac{\\pi}{4}",
            name: "Half-period sin²/cos²",
            note: "",
          },
          {
            tex: "\\displaystyle\\int_0^{\\pi}\\sin x\\,\\d x = 2",
            name: "Sine arch",
            note: "Classic result.",
          },
          {
            tex: "\\displaystyle\\int_0^1 x^a(1-x)^b\\,\\d x = B(a+1,b+1)=\\frac{\\Gamma(a+1)\\,\\Gamma(b+1)}{\\Gamma(a+b+2)}",
            name: "Beta function",
            note: "a, b > −1.",
          },
          {
            tex: "\\displaystyle\\int_0^{\\infty} x^{n-1}e^{-x}\\,\\d x = \\Gamma(n)\\quad(\\text{Gamma function})",
            name: "Gamma function",
            note: "Γ(n) = (n−1)! for positive integers.",
          },
        ],
      },
      {
        heading: "Reduction Formulas",
        rows: [
          {
            tex: "\\displaystyle\\int\\sin^n x\\,\\d x = -\\frac{\\sin^{n-1}x\\cos x}{n}+\\frac{n-1}{n}\\int\\sin^{n-2}x\\,\\d x",
            name: "sin reduction",
            note: "",
          },
          {
            tex: "\\displaystyle\\int\\cos^n x\\,\\d x = \\frac{\\cos^{n-1}x\\sin x}{n}+\\frac{n-1}{n}\\int\\cos^{n-2}x\\,\\d x",
            name: "cos reduction",
            note: "",
          },
          {
            tex: "\\displaystyle\\int\\tan^n x\\,\\d x = \\frac{\\tan^{n-1}x}{n-1}-\\int\\tan^{n-2}x\\,\\d x,\\quad n\\ne 1",
            name: "tan reduction",
            note: "",
          },
          {
            tex: "\\displaystyle\\int\\sec^n x\\,\\d x = \\frac{\\sec^{n-2}x\\tan x}{n-1}+\\frac{n-2}{n-1}\\int\\sec^{n-2}x\\,\\d x",
            name: "sec reduction",
            note: "n ≥ 2.",
          },
          {
            tex: "\\displaystyle\\int x^n e^x\\,\\d x = x^n e^x - n\\int x^{n-1}e^x\\,\\d x",
            name: "xⁿ eˣ reduction",
            note: "",
          },
          {
            tex: "\\displaystyle\\int x^n\\ln x\\,\\d x = \\frac{x^{n+1}\\ln x}{n+1}-\\frac{1}{n+1}\\int x^n\\,\\d x",
            name: "xⁿ ln x reduction",
            note: "",
          },
        ],
      },
    ],
  },
];
