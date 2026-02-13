import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const feelings = ["Anxious", "Low", "Frustrated", "Ashamed", "Overwhelmed", "Neutral"];
const actions = ["Avoid the task", "Overthink", "Procrastinate", "Work harder than needed", "Shut down", "Nothing changes"];

const fadeVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const childFade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ProgressDots = ({ current, total }: { current: number; total: number }) => (
  <div className="flex gap-2.5 justify-center mb-10">
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        initial={false}
        animate={{
          width: i === current ? 32 : 16,
          opacity: i <= current ? 1 : 0.3,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`h-2 rounded-full ${
          i === current
            ? "bg-primary"
            : i < current
            ? "bg-pastel-lavender"
            : "bg-border"
        }`}
      />
    ))}
  </div>
);

const ChipSelect = ({
  options,
  selected,
  onToggle,
  otherValue,
  onOtherChange,
}: {
  options: string[];
  selected: string[];
  onToggle: (opt: string) => void;
  otherValue: string;
  onOtherChange: (val: string) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map((opt) => (
      <motion.button
        key={opt}
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onToggle(opt)}
        className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border-2 ${
          selected.includes(opt)
            ? "bg-primary text-primary-foreground border-primary shadow-md"
            : "bg-card text-foreground border-border hover:border-pastel-lavender hover:bg-pastel-blue/30"
        }`}
      >
        {opt}
      </motion.button>
    ))}
    <input
      type="text"
      placeholder="Other…"
      value={otherValue}
      onChange={(e) => onOtherChange(e.target.value)}
      className="px-4 py-2.5 rounded-full text-sm border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 w-32 transition-colors"
    />
  </div>
);

const CTAButton = ({ onClick, disabled, children, variant = "primary" }: { onClick: () => void; disabled?: boolean; children: React.ReactNode; variant?: "primary" | "soft" }) => (
  <motion.button
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-4 rounded-2xl font-medium text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
      variant === "primary"
        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
        : "bg-pastel-lavender text-secondary-foreground hover:bg-pastel-blue"
    }`}
  >
    {children}
  </motion.button>
);

const DecorativeBlobs = ({ variant = 0 }: { variant?: number }) => {
  const positions = [
    // variant 0
    [
      { top: "-60px", right: "-40px", size: "180px", color: "bg-pastel-blue/40" },
      { bottom: "-30px", left: "-50px", size: "140px", color: "bg-pastel-lavender/30" },
    ],
    // variant 1
    [
      { top: "-40px", left: "-30px", size: "120px", color: "bg-pastel-mint/40" },
      { bottom: "-50px", right: "-40px", size: "160px", color: "bg-pastel-blue/30" },
    ],
    // variant 2
    [
      { top: "-50px", right: "-60px", size: "200px", color: "bg-pastel-lavender/35" },
      { bottom: "-40px", left: "-30px", size: "130px", color: "bg-pastel-rose/25" },
    ],
    // variant 3
    [
      { top: "-30px", left: "-50px", size: "150px", color: "bg-pastel-peach/35" },
      { bottom: "-60px", right: "-30px", size: "170px", color: "bg-pastel-lavender/30" },
    ],
    // variant 4
    [
      { top: "-50px", right: "-30px", size: "160px", color: "bg-pastel-blue/35" },
      { bottom: "-40px", left: "-40px", size: "190px", color: "bg-pastel-mint/25" },
    ],
  ];

  const blobs = positions[variant % positions.length];

  return (
    <>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
          className={`absolute rounded-full blur-3xl ${blob.color} pointer-events-none`}
          style={{
            width: blob.size,
            height: blob.size,
            top: "top" in blob ? blob.top : undefined,
            bottom: "bottom" in blob ? blob.bottom : undefined,
            left: "left" in blob ? blob.left : undefined,
            right: "right" in blob ? blob.right : undefined,
          }}
        />
      ))}
    </>
  );
};

export default function MindfulActivity() {
  const [screen, setScreen] = useState(0);
  const [thought, setThought] = useState("");
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [feelingOther, setFeelingOther] = useState("");
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [actionOther, setActionOther] = useState("");
  const [evidence, setEvidence] = useState("");
  const [reframe, setReframe] = useState("");
  const [finished, setFinished] = useState(false);

  const toggle = (list: string[], item: string) =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const next = () => setScreen((s) => s + 1);

  const reset = () => {
    setScreen(0);
    setThought("");
    setSelectedFeelings([]);
    setFeelingOther("");
    setSelectedActions([]);
    setActionOther("");
    setEvidence("");
    setReframe("");
    setFinished(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <ProgressDots current={screen} total={5} />

        <AnimatePresence mode="wait">
          {/* SCREEN 0 — Intro */}
          {screen === 0 && (
            <motion.div key="s0" {...fadeVariants} className="relative">
              <DecorativeBlobs variant={0} />
              <div className="relative bg-card/70 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-sm space-y-6">
                <h1 className="text-3xl md:text-4xl font-heading text-foreground leading-tight">
                  Notice → Understand → Reframe
                </h1>
                <motion.div variants={staggerChildren} initial="initial" animate="animate" className="space-y-4 text-foreground/80 leading-relaxed text-[15px]">
                  <motion.p variants={childFade}>
                    Sometimes it's not just a situation that affects us —<br />
                    it's the thought we have about it.
                  </motion.p>
                  <motion.p variants={childFade}>Our thoughts can quietly influence:</motion.p>
                  <motion.ul variants={childFade} className="space-y-2 ml-1">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-pastel-blue flex-shrink-0" />How we feel
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-pastel-lavender flex-shrink-0" />What we do next
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-pastel-mint flex-shrink-0" />Whether we avoid or take action
                    </li>
                  </motion.ul>
                  <motion.p variants={childFade}>This short activity will help you:</motion.p>
                  <motion.div variants={childFade} className="space-y-2 ml-1">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-pastel-blue/60 flex items-center justify-center text-xs font-semibold text-primary">1</span>
                      Notice one thought
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-pastel-lavender/60 flex items-center justify-center text-xs font-semibold text-primary">2</span>
                      Understand how it affects you
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-pastel-mint/60 flex items-center justify-center text-xs font-semibold text-primary">3</span>
                      Adjust it in a balanced way
                    </div>
                  </motion.div>
                  <motion.p variants={childFade} className="italic text-muted-foreground border-l-2 border-pastel-lavender pl-4">
                    This is not about forcing positivity.<br />
                    It's about gaining clarity and choice.
                  </motion.p>
                  <motion.p variants={childFade} className="text-sm text-muted-foreground">
                    Time required: 4–6 minutes<br />
                    There are no right or wrong answers.
                  </motion.p>
                </motion.div>
                <CTAButton onClick={next}>Start</CTAButton>
              </div>
            </motion.div>
          )}

          {/* SCREEN 1 — Thought */}
          {screen === 1 && (
            <motion.div key="s1" {...fadeVariants} className="relative">
              <DecorativeBlobs variant={1} />
              <div className="relative bg-card/70 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-sm space-y-6">
                <h1 className="text-3xl font-heading text-foreground">What's the Thought?</h1>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-[15px]">
                  <p>Think of one thought that has been bothering you lately.</p>
                  <p>
                    It could be self-critical.<br />
                    It could feel overwhelming.<br />
                    It might feel completely true.
                  </p>
                  <p>Write it in one sentence.</p>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    placeholder="I'm always behind."
                    className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-[15px] transition-all"
                  />
                  <p className="text-xs text-muted-foreground ml-2">Just notice it. No judgment.</p>
                </div>
                <CTAButton onClick={next} disabled={!thought.trim()}>Continue</CTAButton>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2 — Impact */}
          {screen === 2 && (
            <motion.div key="s2" {...fadeVariants} className="relative">
              <DecorativeBlobs variant={2} />
              <div className="relative bg-card/70 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-sm space-y-6">
                <h1 className="text-3xl font-heading text-foreground">How Does This Thought Affect You?</h1>
                <p className="text-foreground/80 text-[15px]">When you think this thought:</p>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">How do you usually feel?</p>
                  <ChipSelect
                    options={feelings}
                    selected={selectedFeelings}
                    onToggle={(opt) => setSelectedFeelings(toggle(selectedFeelings, opt))}
                    otherValue={feelingOther}
                    onOtherChange={setFeelingOther}
                  />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">What do you usually do next?</p>
                  <ChipSelect
                    options={actions}
                    selected={selectedActions}
                    onToggle={(opt) => setSelectedActions(toggle(selectedActions, opt))}
                    otherValue={actionOther}
                    onOtherChange={setActionOther}
                  />
                </div>
                <div className="bg-pastel-blue/30 rounded-2xl p-5 space-y-1.5 border border-pastel-blue/40">
                  <p className="text-sm font-medium text-accent-foreground">Thought → Feeling → Action</p>
                  <p className="text-xs text-muted-foreground">
                    This pattern often happens automatically.<br />
                    Awareness creates space.
                  </p>
                </div>
                <CTAButton onClick={next} disabled={selectedFeelings.length === 0 && !feelingOther}>Continue</CTAButton>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3 — Evidence */}
          {screen === 3 && (
            <motion.div key="s3" {...fadeVariants} className="relative">
              <DecorativeBlobs variant={3} />
              <div className="relative bg-card/70 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-sm space-y-6">
                <h1 className="text-3xl font-heading text-foreground">What Supports This Thought?</h1>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-[15px]">
                  <p>Sometimes our thoughts feel completely true.</p>
                  <p>Before adjusting it, take a moment to look at the evidence.</p>
                  <p>Ask yourself:</p>
                  <p className="italic text-foreground/70 border-l-2 border-pastel-peach pl-4">
                    What experiences, facts, or memories make this thought feel valid?
                  </p>
                  <p>
                    You don't need to prove it wrong.<br />
                    Just gently explore what supports it.
                  </p>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={evidence}
                    onChange={(e) => setEvidence(e.target.value)}
                    placeholder="e.g. I missed two deadlines last month."
                    className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-[15px] transition-all"
                  />
                  <p className="text-xs text-muted-foreground ml-2">Be specific. Even small examples count.</p>
                </div>
                <div className="bg-pastel-peach/30 rounded-2xl p-4 border border-pastel-peach/40">
                  <p className="text-xs text-muted-foreground">
                    Looking at evidence helps you step back from automatic conclusions.
                  </p>
                </div>
                <CTAButton onClick={next} disabled={!evidence.trim()}>Reframe</CTAButton>
              </div>
            </motion.div>
          )}

          {/* SCREEN 4 — Reframe + Closing */}
          {screen === 4 && (
            <motion.div key="s4" {...fadeVariants} className="relative">
              <DecorativeBlobs variant={4} />
              {!finished ? (
                <div className="relative bg-card/70 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-sm space-y-6">
                  <h1 className="text-3xl font-heading text-foreground">Adjust the Thought</h1>
                  <div className="space-y-3 text-foreground/80 leading-relaxed text-[15px]">
                    <p>Now that you see how this thought affects you — and what supports it — try rewriting it in a more balanced way.</p>
                    <p>
                      Not overly positive.<br />
                      Just realistic and fair.
                    </p>
                    <p>A balanced thought often:</p>
                    <ul className="space-y-2 ml-1">
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-pastel-blue flex-shrink-0" />Acknowledges what's true
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-pastel-lavender flex-shrink-0" />Leaves room for flexibility
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-pastel-mint flex-shrink-0" />Reduces harsh language like "always" or "never"
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={reframe}
                      onChange={(e) => setReframe(e.target.value)}
                      placeholder="I made a mistake, but I can correct it."
                      className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-[15px] transition-all"
                    />
                    <p className="text-xs text-muted-foreground ml-2">
                      Instead of: "I always mess up."<br />
                      Try: "I made a mistake, but I can correct it."
                    </p>
                  </div>
                  <CTAButton onClick={() => setFinished(true)} disabled={!reframe.trim()}>Submit</CTAButton>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  {/* Extra decorative elements for closing */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-pastel-lavender/30 blur-3xl pointer-events-none"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-pastel-blue/25 blur-3xl pointer-events-none"
                  />

                  <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 shadow-lg overflow-hidden">
                    {/* Top accent bar */}
                    <div className="h-1.5 bg-gradient-to-r from-pastel-blue via-pastel-lavender to-pastel-mint" />

                    <div className="p-8 space-y-6">
                      {/* Breathing icon */}
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="mx-auto w-16 h-16 rounded-full bg-pastel-lavender/50 flex items-center justify-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-pastel-blue/60" />
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center text-muted-foreground italic text-[15px]"
                      >
                        Take a slow breath before you leave this screen.
                      </motion.p>

                      <motion.div
                        variants={staggerChildren}
                        initial="initial"
                        animate="animate"
                        className="space-y-4 text-foreground/80 leading-relaxed text-[15px]"
                      >
                        <motion.p variants={childFade}>
                          The thought you wrote down may still exist — and that's okay.<br />
                          The goal was never to eliminate it.
                        </motion.p>

                        <motion.p variants={childFade} className="font-medium text-foreground text-base">
                          What you just practiced is something powerful:
                        </motion.p>

                        <motion.div variants={childFade} className="space-y-3 py-2">
                          {[
                            { color: "bg-pastel-blue", text: "You paused." },
                            { color: "bg-pastel-lavender", text: "You looked at the thought instead of automatically believing it." },
                            { color: "bg-pastel-mint", text: "You explored what supports it." },
                            { color: "bg-pastel-peach", text: "You understood how it was affecting you." },
                            { color: "bg-pastel-rose", text: "And you chose to respond differently." },
                          ].map(({ color, text }, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                              className="flex items-start gap-3"
                            >
                              <span className={`w-3 h-3 rounded-full ${color} flex-shrink-0 mt-1`} />
                              <span>{text}</span>
                            </motion.div>
                          ))}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.8 }}
                          className="bg-pastel-blue/20 rounded-2xl p-5 border border-pastel-blue/30 space-y-3"
                        >
                          <p className="font-medium text-foreground">That creates space.</p>
                          <p className="text-sm">
                            Over time, even small moments of awareness like this can reduce overthinking, soften self-criticism, and make actions feel more manageable.
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.2 }}
                          className="text-center space-y-2 pt-2"
                        >
                          <p>
                            You don't have to change every thought.<br />
                            You only need to notice them — one at a time.
                          </p>
                          <p className="text-xl font-heading text-primary">You did that today.</p>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.6 }}
                      >
                        <CTAButton onClick={reset} variant="soft">Finish</CTAButton>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
