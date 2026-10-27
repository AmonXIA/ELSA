"""用 edge-tts 批量生成 100 篇磨耳朵音频（Ana 美式童声），并发 4、失败重试 3 次。"""
import asyncio, json, os, sys
import edge_tts

VOICE = 'en-US-AnaNeural'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'listen', 'audio')
articles = json.load(open(os.path.join(ROOT, 'tools', 'listen_articles.json'), encoding='utf-8'))
sem = asyncio.Semaphore(4)
lock = asyncio.Lock()
done = [0]

async def gen(a):
    n = a['n']
    out = os.path.join(OUT, f"{n:02d}.mp3")
    if os.path.exists(out) and os.path.getsize(out) > 1000:
        async with lock:
            done[0] += 1
        return True
    async with sem:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(a['en'], VOICE).save(out)
                async with lock:
                    done[0] += 1
                    print(f"[{done[0]}/100] #{n} ok ({os.path.getsize(out)//1024} KB)", flush=True)
                return True
            except Exception as e:
                print(f"#{n} attempt {attempt+1} failed: {e}", flush=True)
                await asyncio.sleep(2 + attempt * 3)
        print(f"#{n} GIVE UP", flush=True)
        return False

async def main():
    os.makedirs(OUT, exist_ok=True)
    results = await asyncio.gather(*[gen(a) for a in articles])
    ok = sum(1 for r in results if r)
    print(f"DONE {ok}/100", flush=True)
    sys.exit(0 if ok == 100 else 1)

asyncio.run(main())
