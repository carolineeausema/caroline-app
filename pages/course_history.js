import React, { useState } from 'react';
import styles from '../components/layout.module.css';

const CoursePage = () => {
  const [expandedCourse, setExpandedCourse] = useState(null);

  const toggleExpanded = (courseCode) => {
    if (expandedCourse === courseCode) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseCode);
    }
  };

  const toggleYearExpand = (yearCode) => {
    if (expandedYear === yearCode) {
        setExpandedYear(null);
    } else {
        setExpandedCourse(yearCode);
    }
  }

  const courseWithDescription = (courseCode, courseTitle, creditHours, description) => (
    <div key={courseCode} className={styles.courseCard}>
      <button
        className={styles.courseButton}
        onClick={() => toggleExpanded(courseCode)}
      >
        {courseCode} - {courseTitle}
      </button>
      {expandedCourse === courseCode && (
        <div>
            <p className={styles.creditHours}>Credit Hours:  <strong>{creditHours}</strong></p>
            <p className={styles.courseDescription}>{description}</p>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: '42rem', padding: '0 1rem', margin: '.5rem auto 1rem' }}>
        <h2>Coursework</h2>
      <h7 style={{ 'font-size': '12px' }}>Courses I've taken as a CS student at Purdue University (with a Sociology minor).</h7>

      <h5>Freshman Fall (2020)</h5>
      {courseWithDescription(
        'SOC 22000',
        'Social Problems',
        '3',
        'Contemporary problems at the community, society, and international levels, focusing on patterns of social organization and social change in American society, with concentration on such topics as technological militarism and war, poverty, racism, political protest, and cybernation.'
      )}
      {courseWithDescription(
        'CS 18000',
        'Problem Solving And Object-Oriented Programming',
        '4',
        'Problem solving and algorithms, implementation of algorithms in a high level programming language, conditionals, the iterative approach and debugging, collections of data, searching and sorting, solving problems by decomposition, the object-oriented approach, subclasses of existing classes, handling exceptions that occur when the program is running, graphical user interfaces (GUIs), data stored in files, abstract data types, a glimpse at topics from other CS courses. Intended primarily for students majoring in computer sciences.'
      )}
      {courseWithDescription(
        'CS 19100',
        'Freshman Resources Seminar',
        '1',
        'Introduction to academic and personal success strategies.'
      )}
      {courseWithDescription(
        'CS 19300',
        'Tools',
        '1',
        'This course is designed to introduce new Computer Science students to various programming tools which will aid them in their Computer Science classes, personal projects, and software development job experiences'
      )}
      {courseWithDescription(
        'HONR 19901',
        'The Evolution of Ideas',
        '1',
        'Interdisciplinary exploration of key ideas that have shaped human thought. Section theme: Elections.'
      )}
      {courseWithDescription(
        'MA 16100',
        'Plane Analytic Geometry And Calculus I',
        '4',
        'Introduction to differential and integral calculus of one variable, with applications. Some schools or departments may allow only 4 credit hours toward graduation for this course.'
      )}

      <h5>Freshman Spring (2021)</h5>
      {courseWithDescription(
        'CS 18200',
        'Foundations Of Computer Science',
        '3',
        'Logic and proofs; sets, functions, relations, sequences and summations; number representations; counting; fundamentals of the analysis of algorithms; graphs and trees; proof techniques; recursion; Boolean logic; finite state machines; pushdown automata; computability and undecidability.'
      )}
      {courseWithDescription(
        'CS 24000',
        'Programming in C',
        '3',
        'The UNIX environment, C development cycle, data representation, operators, program structure, recursion, macros, C preprocessor, pointers and addresses, dynamic memory allocation, structures, unions, typedef, bit-fields, pointer/structure applications, UNIX file abstraction, file access, low-level I/O, concurrency.'
      )}
      {courseWithDescription(
        'HONR 19902',
        'The Evolution of Ideas II',
        '1',
        'This course is the second half of the required course sequence taken by all students entering the Honors College. Section theme: Robots.'
      )}
      {courseWithDescription(
        'MA 16200',
        'Plane Analytic Geometry And Calculus II',
        '5',
        'Continuation of MA 16100. Vectors in two and three dimensions, techniques of integration, infinite series, conic sections, polar coordinates, surfaces in three dimensions.'
      )}
      {courseWithDescription(
        'MUS 25000',
        'Music Appreciation',
        '3',
        'The traditions, forms, and styles of classical music. Other types of music may be examined as well.'
      )}
      
      <h5>Sophomore Summer (2021)</h5>
      {courseWithDescription(
        'ENGL 10600',
        'First-Year Composition'
      )}
      {courseWithDescription(
        'SOC 10000',
        'Introductory Sociology'
      )}

      <h5>Sophomore Fall (2021)</h5>
        {courseWithDescription(
        'CS 25000',
        'Computer Architecture',
        '4',
        'Digital logic: transistors, gates, and combinatorial circuits; clocks; registers and register banks; arithmetic-logic units; data representation: big-endian and little-endian integers; ones and twos complement arithmetic; signed and unsigned values; Von-Neumann architecture and bottleneck; instruction sets; RISC and CISC designs; instruction pipelines and stalls; rearranging code; memory and address spaces; physical and virtual memory; interleaving; page tables; memory caches; bus architecture; polling and interrupts; DMA; device programming; assembly language; optimizations; parallelism; data pipelining. '
        )}
        {courseWithDescription(
        'CS 25100',
        'Data Structures And Algorithms',
        '3',
        'Running time analysis of algorithms and their implementations, one-dimensional data structures, trees, heaps, additional sorting algorithms, binary search trees, hash tables, graphs, directed graphs, weighted graph algorithms, additional topics.'
        )}
        {courseWithDescription(
        'EPCS 20100',
        'Sophomore Participation In EPICS'
        )}
        {courseWithDescription(
        'MA 26100',
        'Multivariate Calculus',
        '4',
        'Planes, lines, and curves in three dimensions. Differential calculus of several variables; multiple integrals. Introduction to vector calculus.'
        )}
        {courseWithDescription(
        'SOC 35200',
        'Drugs, Culture, And Society',
        '3',
        'The course provides an overview of the social and cultural underpinnings of drug use across societies. Students engage with various topics, including addiction, global markets, drug epidemics, public policy, and cross-cultural differences in drug use.'
        )}


      <h5>Sophomore Spring (2022)</h5>
        {courseWithDescription(
        'CS 25200',
        'Systems Programming',
        '4',
        'Low-level programming; review of addresses, pointers, memory layout, and data representation; text, data, and bss segments; debugging and hex dumps; concurrent execution with threads and processes; address spaces; file names; descriptors and file pointers; inheritance; system calls and library functions; standard I/O and string libraries; simplified socket programming; building tools to help programmers; make and make files; shell scripts and quoting; unix tools including sed, echo, test, and find; scripting languages such as awk; version control; object and executable files (.o and a.out); symbol tables; pointers to functions; hierarchical directories; and DNS hierarchy; programming embedded systems.'
        )}
        {courseWithDescription(
        'EAPS 37500',
        'Great Issues - Fossil Fuels, Energy And Society',
        '3',
        'Prosperity of the 20th century was based on abundant and cheap energy; during the 21st century we will be faced with difficult challenges. Our society will face higher energy prices, decline of petroleum based fuels supplies, increased environmental effects of fossil fuels usage, and the challenge of solving the technological problems of developing alternative fuels. This course will review the structure, economics, and geopolitical issues faced by fossil fuel industries and the mitigation strategies that will be needed to change to low fossil fuel use society based on low polluting renewable energy sources.'
        )}
        {courseWithDescription(
        'MA 26500',
        'Linear Algebra',
        '3',
        'Introduction to linear algebra. Systems of linear equations, matrix algebra, vector spaces, determinants, eigenvalues and eigenvectors, diagonalization of matrices, applications.'
        )}
        {courseWithDescription(
        'SOC 36700',
        'Religion In America',
        '3',
        'Examines the social dimensions of religion in American life; religion in American culture; social profiles of America’s religious groups, trends in individual religious commitment; and religion’s impact on American life.'
        )}
        {courseWithDescription(
        'STAT 51100',
        'Statistical Methods',
        '3',
        'Descriptive statistics; elementary probability; sampling distributions; inference, testing hypotheses, and estimation; normal, binomial, Poisson, hypergeometric distributions; one-way analysis of variance; contingency tables; regression.'
        )}

        <h5>Junior Fall (2022)</h5>
        {courseWithDescription(
        'AD 25500',
        'Art Appreciation',
        '3',
        'Understanding and appreciation of the problems overcome by mankind in the origins and growth of art.'
        )}
        {courseWithDescription(
        'CS 35400',
        'Operating Systems',
        '3',
        'Should not be taken concurrently with CS 35200. Introduction to operating systems. Computer system and operating system architectures, processes, inter-process communication, inter-process synchronization, mutual exclusion, deadlocks, memory hierarchy, virtual memory, CPU scheduling, file systems, I/O device management, security.'
        )}
        {courseWithDescription(
        'CS 35500',
        'Introduction To Cryptography',
        '3',
        'An introduction to cryptography basics: Classic historical ciphers including Caesar, Vigenere and Vernam ciphers; modern ciphers including DES, AES, Pohlig-Hellman, and RSA; signatures and digests; key exchange; simple protocols; block and stream ciphers; network-centric protocols.'
        )}
        {courseWithDescription(
        'SOC 32400',
        'Criminology',
        '3',
        'Nature and cause of crime; methods of dealing with adult and juvenile offenders, consideration of present programs for the social treatment of crime in the light of needed changes.'
        )}

        <h5>Junior Spring (2023)</h5>
        {courseWithDescription(
        'COM 21700',
        'Science Writing And Presentation',
        '3',
        'Students learn to effectively communicate scientific and technical information both verbally and in writing to a variety of audiences.'
        )}
        {courseWithDescription(
        'SOC 39100D',
        'Data and Society',
        '3',
        'Social implications of the digital revolution, including ethical issues associated with algorithmic design and privacy. Discusses artificial intellience to understand or influence people’s behavior. Students will use a sociological lens to explore how our increasingly digital lifestyle changes institutions and social relations.'
        )}
        {courseWithDescription(
        'CS 42200',
        'Computer Networks',
        '3',
        'Undergraduate-level introduction to computer networks and data communication. Low-level details of media, signals, and bits: time division and frequency division multiplexing; encoding; modulation; bandwidth, throughput, and noise. Packet transmission: Local Area Network (Ethernet, FDDI) and Wide Area Network technologies (ATM); wireless networks; network interconnection with repeaters, bridges, and switches; DSU/CSU; xDSL and cable modems. Internetworking: router-based architecture; IP addressing; address binding with ARP; datagram encapsulation and fragmentation; UDP and TCP, retransmission; protocol ports; ICMP and error handling. Network applications: client/server concept; port demultiplexing; program interface to protocols (API); use by clients and servers; domain name system; TELNET; Web technologies including HTTP, CGI, Java; RPC and middleware; network management.'
        )}
        {courseWithDescription(
        'CS 47100',
        'Introduction to Artificial Intelligence',
        '3',
        'Students are expected to spend at least three hours per week gaining experience with artificial intelligence systems and developing software. Basic problem-solving strategies, heuristic search, problem reduction and AND/OR graphs, knowledge representation, expert systems, generating explanations, uncertainty reasoning, game playing, planning, machine learning, computer vision, and programming systems such as Lisp or Prolog.'
        )}
        {courseWithDescription(
        'EAPS 11100',
        'Physical Geology',
        '3',
        'Geologic processes and the development of land forms. Laboratory covers the study of minerals and rocks, the interpretations of topographic and geologic maps, and field investigations.'
        )}


      <h5>Senior Summer (2023)</h5>
      {courseWithDescription(
        'SA 11003',
        'Global Egypt',
        '6',
        'Honors College Maymester Study Abroad to Egypt. Three weeks of observing thousands of years of engineering, tracing ongoing legacies of imperialism, and experiencing globalization from the perspective of the Global South.'
      )}
    </div>
  );
};

export default CoursePage;
