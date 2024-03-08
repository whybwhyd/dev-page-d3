import styles from '../../styles/checkStyle.module.css';

export default function SignUpLayout() {
  return (
    <div className="grid w-[850px] h-screen">
      <div className={styles.check}>
        <div className="grid gap-[20px] translate-x-10 translate-y-1/4">
          <p className="text-9xl text-[#f97316]">쓰다:</p>
          <p className="text-[34px] text-[#575555]">
            1. 종이나 그밖의 평평한 면에 일정한 획을 그어 <br />
            어떤 모양으로 이루어지게 하다. 적다. 기록하다.
          </p>
          <p className="text-[34px] text-[#575555]">
            2. 머릿속에서 생각해 내어 종이 등에 글씨로
            <br /> 나타내다. 창작하다
          </p>
          <p className="text-[34px] text-[#575555]">
            3. 머릿속에서 생각해 내어 일정한 기호로 <br />
            악보 위에 나타내다. 작곡하다.
          </p>
        </div>
      </div>
    </div>
  );
}
