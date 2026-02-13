import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const feelings = ["Anxious", "Low", "Frustrated", "Ashamed", "Overwhelmed", "Neutral"];
const actions = ["Avoid the task", "Overthink", "Procrastinate", "Work harder than needed", "Shut down", "Nothing changes"];

const fadeVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

const ProgressDots = ({ current, total }: { current: number; total: number }) => (
  <div className="flex gap-2 justify-center mb-8">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-1.5 rounded-full transition-all duration-500 ${
          i === current ? "w-8 bg-primary" : i < current ? "w-4 bg-primary/40" : "w-4 bg-border"
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
      <button
        key={opt}
        type="button"
        onClick={() => onToggle(opt)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
          selected.includes(opt)
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background text-foreground border-border hover:border-primary/40"
        }`}
      >
        {opt}
      </button>
    ))}
    <input
      type="text"
      placeholder="Other…"
      value={otherValue}
      onChange={(e) => onOtherChange(e.target.value)}
      className="px-4 py-2 rounded-full text-sm border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 w-28"
    />
  </div>
);

export default function MindfulActivity() {
  const [screen, setScreen] = useState(0);
  const [thought, setThought] = useState("");
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [feelingOther, setFeelingOther] = useState("");
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [actionOther, setActionOther] = useState("");
  const [reframe, setReframe] = useState("");
  const [finished, setFinished] = useState(false);

  const toggle = (list: string[], item: string) =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const next = () => setScreen((s) => s + 1);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <ProgressDots current={screen} total={4} />

        <AnimatePresence mode="wait">
          {screen === 0 && (
            <motion.div key="s0" {...fadeVariants} className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-heading text-foreground leading-tight">
                Notice → Understand → Reframe
              </h1>

              <div className="space-y-4 text-foreground/80 leading-relaxed text-[15px]">
                <p>
                  Sometimes it's not just a situation that affects us —<br />
                  it's the thought we have about it.
                </p>
                <p>Our thoughts can quietly influence:</p>
                <ul className="space-y-1 ml-1">
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>How we feel</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>What we do next</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Whether we avoid or take action</li>
                </ul>
                <p>This short activity will help you:</p>
                <ol className="space-y-1 ml-1">
                  <li className="flex items-start gap-2"><span className="text-primary font-medium">1.</span>Notice one thought</li>
                  <li className="flex items-start gap-2"><span className="text-primary font-medium">2.</span>Understand how it affects you</li>
                  <li className="flex items-start gap-2"><span className="text-primary font-medium">3.</span>Adjust it in a balanced way</li>
                </ol>
                <p className="italic text-muted-foreground">
                  This is not about forcing positivity.<br />
                  It's about gaining clarity and choice.
                </p>
                <p className="text-sm text-muted-foreground">
                  Time required: 4–6 minutes<br />
                  There are no right or wrong answers.
                </p>
              </div>

              <button onClick={next} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity">
                Start
              </button>
            </motion.div>
          )}

          {screen === 1 && (
            <motion.div key="s1" {...fadeVariants} className="space-y-6">
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
                  className="w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-[15px]"
                />
                <p className="text-xs text-muted-foreground ml-1">Just notice it. No judgment.</p>
              </div>

              <button
                onClick={next}
                disabled={!thought.trim()}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                Continue
              </button>
            </motion.div>
          )}

          {screen === 2 && (
            <motion.div key="s2" {...fadeVariants} className="space-y-6">
              <h1 className="text-3xl font-heading text-foreground">How Does This Thought Affect You?</h1>
              <p className="text-foreground/80 text-[15px]">When you think this thought:</p>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">How do you usually feel?</p>
                <ChipSelect
                  options={feelings}
                  selected={selectedFeelings}
                  onToggle={(opt) => setSelectedFeelings(toggle(selectedFeelings, opt))}
                  otherValue={feelingOther}
                  onOtherChange={setFeelingOther}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">What do you usually do next?</p>
                <ChipSelect
                  options={actions}
                  selected={selectedActions}
                  onToggle={(opt) => setSelectedActions(toggle(selectedActions, opt))}
                  otherValue={actionOther}
                  onOtherChange={setActionOther}
                />
              </div>

              <div className="bg-accent/50 rounded-xl p-4 space-y-1">
                <p className="text-sm font-medium text-accent-foreground">Thought → Feeling → Action</p>
                <p className="text-xs text-muted-foreground">
                  This pattern often happens automatically.<br />
                  Awareness creates space.
                </p>
              </div>

              <button
                onClick={next}
                disabled={selectedFeelings.length === 0 && !feelingOther}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                Reframe
              </button>
            </motion.div>
          )}

          {screen === 3 && (
            <motion.div key="s3" {...fadeVariants} className="space-y-6">
              {!finished ? (
                <>
                  <h1 className="text-3xl font-heading text-foreground">Adjust the Thought</h1>
                  <div className="space-y-3 text-foreground/80 leading-relaxed text-[15px]">
                    <p>Now that you see how this thought affects you, try rewriting it in a more balanced way.</p>
                    <p>
                      Not overly positive.<br />
                      Just realistic and fair.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={reframe}
                      onChange={(e) => setReframe(e.target.value)}
                      placeholder="I made a mistake, but I can correct it."
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 text-[15px]"
                    />
                    <p className="text-xs text-muted-foreground ml-1">
                      Instead of: "I always mess up."<br />
                      Try: "I made a mistake, but I can correct it."
                    </p>
                  </div>

                  <button
                    onClick={() => setFinished(true)}
                    disabled={!reframe.trim()}
                    className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity disabled:opacity-40"
                  >
                    Submit
                  </button>
                </>
              ) : (
                <motion.div {...fadeVariants} className="space-y-5">
                  <div className="space-y-4 text-foreground/80 leading-relaxed text-[15px]">
                    <p className="text-muted-foreground italic">Take a slow breath before you leave this screen.</p>

                    <p>
                      The thought you wrote down may still exist — and that's okay.<br />
                      The goal was never to eliminate it.
                    </p>

                    <p>What you just practiced is something powerful:</p>

                    <ul className="space-y-1.5 ml-1">
                      <li className="flex items-start gap-2"><span className="text-primary">—</span>You paused.</li>
                      <li className="flex items-start gap-2"><span className="text-primary">—</span>You looked at the thought instead of automatically believing it.</li>
                      <li className="flex items-start gap-2"><span className="text-primary">—</span>You understood how it was affecting you.</li>
                      <li className="flex items-start gap-2"><span className="text-primary">—</span>And you chose to respond differently.</li>
                    </ul>

                    <p>That creates space.</p>

                    <p>
                      Over time, even small moments of awareness like this can reduce overthinking, soften self-criticism, and make actions feel more manageable.
                    </p>

                    <p>
                      You don't have to change every thought.<br />
                      You only need to notice them — one at a time.
                    </p>

                    <p className="font-medium text-foreground">You did that today.</p>
                  </div>

                  <button
                    onClick={() => {
                      setScreen(0);
                      setThought("");
                      setSelectedFeelings([]);
                      setFeelingOther("");
                      setSelectedActions([]);
                      setActionOther("");
                      setReframe("");
                      setFinished(false);
                    }}
                    className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity"
                  >
                    Finish
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
