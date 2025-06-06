/** @noSelfInFile */

/**
 * TypeScript declarations for CC: Tweaked Lua API
 * Based on documentation from https://tweaked.cc/
 */

export {};

/** @noSelf **/
declare global {
  /**
   * Global Environment (_G)
   */

  /**
   * Writes a line of text to the screen without a newline at the end, wrapping text if necessary.
   * @param text The text to write to the string
   * @returns The number of lines written
   */
  export function write(text: string): number;

  /**
   * Prints the specified values to the screen separated by spaces, wrapping if necessary.
   * After printing, the cursor is moved to the next line.
   * @param args The values to print on the screen
   * @returns The number of lines written
   */
  export function print(...args: any[]): number;

  /**
   * Prints the specified values to the screen in red, separated by spaces, wrapping if necessary.
   * After printing, the cursor is moved to the next line.
   * @param args The values to print on the screen
   */
  export function printError(...args: any[]): void;

  /**
   * Loads a lua module.
   * @param name Name of the lua module
   * @returns The module
   */
  export function require(name: string): any;

  /**
   * Reads user input from the terminal. This automatically handles arrow keys, pasting,
   * character replacement, history scrollback, auto-completion, and default values.
   * @param replaceChar A character to replace each typed character with. This can be used for hiding passwords.
   * @param history A table holding history items that can be scrolled back to with the up/down arrow keys.
   * @param completeFn A function to be used for completion.
   * @param defaultText Default text which should already be entered into the prompt.
   * @returns The text typed in.
   */
  export function read(
    replaceChar?: string,
    history?: string[],
    completeFn?: (partial: string) => string[] | null,
    defaultText?: string,
  ): string;

  /**
   * Stores the current ComputerCraft and Minecraft versions.
   * Outside of Minecraft (for instance, in an emulator) _HOST will contain the emulator's version instead.
   * For example, "ComputerCraft 1.93.0 (Minecraft 1.15.2)".
   */
  export const _HOST: string;

  /**
   * The default computer settings as defined in the ComputerCraft configuration.
   * This is a comma-separated list of settings pairs defined by the mod configuration or server owner.
   */
  export const _CC_DEFAULT_SETTINGS: string;

  /* @customName math */
  namespace math {
    const huge: number;
    const pi: number;

    function abs(x: number): number;
    function acos(x: number): number;
    function asin(x: number): number;
    function atan(x: number): number;
    function atan2(y: number, x: number): number;
    function ceil(x: number): number;
    function cos(x: number): number;
    function cosh(x: number): number;
    function deg(x: number): number;
    function exp(x: number): number;
    function floor(x: number): number;
    function fmod(x: number, y: number): number;
    function frexp(x: number): [number, number];
    function ldexp(m: number, e: number): number;
    function log(x: number): number;
    function log10(x: number): number;
    function max(...values: number[]): number;
    function min(...values: number[]): number;
    function modf(x: number): [number, number];
    function pow(x: number, y: number): number;
    function rad(x: number): number;
    function random(): number;
    function random(m: number): number;
    function random(m: number, n: number): number;
    function randomseed(x: number): void;
    function sin(x: number): number;
    function sinh(x: number): number;
    function sqrt(x: number): number;
    function tan(x: number): number;
    function tanh(x: number): number;
  }

  namespace textutils {
    /** Special constant to represent an empty JSON array in serialisation. */
    const empty_json_array: any;

    /** Special constant to represent a JSON null value. */
    const json_null: any;

    /** Write text slowly, character by character. */
    function slowWrite(text: string, rate?: number): void;

    /** Print text slowly, character by character, with a newline at the end. */
    function slowPrint(text: string, rate?: number): void;

    /** Format time as a human-readable string, e.g. "6:30 PM" or "18:30". */
    function formatTime(time: number, twentyFourHour?: boolean): string;

    /**
     * Print text with paging: pauses when the screen is full.
     * @returns Number of lines printed
     */
    function pagedPrint(text: string, freeLines?: number): number;

    /**
     * Tabulate rows and print to the screen.
     * @example textutils.tabulate({ "1", "2", "3" }, { "A", "B", "C" });
     */
    function tabulate(...rows: (string[] | number)[]): void;

    /**
     * Tabulate rows and print with paging when screen fills.
     */
    function pagedTabulate(...rows: (string[] | number)[]): void;

    /** Convert a Lua value into a serialised string representation. */
    function serialise(
      value: any,
      opts?: {
        compact?: boolean;
        allow_repetitions?: boolean;
      },
    ): string;

    /** Alias for `serialise`. */
    const serialize: typeof serialise;

    /**
     * Unserialise a value from a string representation.
     * @returns The deserialised value, or `null` on error.
     */
    function unserialise(s: string): any | null;

    /** Alias for `unserialise`. */
    const unserialize: typeof unserialise;

    /**
     * Serialise to a JSON string.
     * @param value The value to serialise.
     * @param options Serialisation options.
     */
    function serialiseJSON(
      value: any,
      options?:
        | boolean
        | {
            nbt_style?: boolean;
            unicode_strings?: boolean;
            allow_repetitions?: boolean;
          },
    ): string;

    /** Alias for `serialiseJSON`. */
    const serializeJSON: typeof serialiseJSON;

    /** Alias for `unserialiseJSON`. */
    const unserializeJSON: typeof unserialiseJSON;

    /**
     * Unserialise a JSON string.
     * @returns The deserialised value, or `null` on error.
     */
    function unserialiseJSON(
      s: string,
      options?: {
        nbt_style?: boolean;
        parse_null?: boolean;
        parse_empty_array?: boolean;
      },
    ): any | null;

    /**
     * Encode a string for use in URLs or POST data.
     */
    function urlEncode(str: string): string;

    /**
     * Complete a Lua expression for use in auto-completion (e.g. shell).
     * @returns Array of possible completions.
     */
    function complete(
      searchText: string,
      searchTable?: Record<string, any>,
    ): string[];
  }

  /**
   * Read and write configuration options for CraftOS and your programs.
   */
  namespace settings {
    type SettingType = "number" | "string" | "boolean" | "table";

    interface SettingOptions {
      description?: string;
      default?: any;
      type?: SettingType;
    }

    interface SettingDetails {
      description?: string;
      default?: any;
      type?: SettingType;
      value?: any;
      changed?: boolean;
    }

    /**
     * Define a new setting.
     * @param name The name of this option
     * @param options Optional metadata and defaults for this setting
     */
    function define(name: string, options?: SettingOptions): void;

    /**
     * Remove a defined setting (does not unset value).
     * @param name The name of the option to remove
     */
    function undefine(name: string): void;

    /**
     * Set the value of a setting.
     * @param name The name of the setting
     * @param value The value to assign (must be serialisable and of correct type)
     */
    function set(name: string, value: any): void;

    /**
     * Get the value of a setting.
     * @param name The name of the setting
     * @param defaultValue A fallback if value is not set
     */
    function get(name: string, defaultValue?: any): any;

    /**
     * Get the metadata and value of a setting.
     * @param name The name of the setting
     * @returns Detailed information about the setting
     */
    function getDetails(name: string): SettingDetails;

    /**
     * Unset a setting (reverts to default).
     * @param name The name of the setting to unset
     */
    function unset(name: string): void;

    /**
     * Clear all set values (reset to defaults).
     */
    function clear(): void;

    /**
     * Get a list of all setting names.
     * @returns Array of setting names
     */
    function getNames(): string[];

    /**
     * Load settings from a file.
     * @param path Path to the file (defaults to ".settings")
     * @returns Whether loading was successful
     */
    function load(path?: string): boolean;

    /**
     * Save settings to a file.
     * @param path Path to the file (defaults to ".settings")
     * @returns Whether saving was successful
     */
    function save(path?: string): boolean;
  }

  /**
   * Emulates Lua's standard io library.
   */
  namespace io {
    const stdin: FileHandle;
    const stdout: FileHandle;
    const stderr: FileHandle;

    type ReadMode =
      | "r"
      | "w"
      | "a"
      | "r+"
      | "w+"
      | "rb"
      | "wb"
      | "ab"
      | "rb+"
      | "wb+";

    /**
     * Closes the provided file handle.
     *
     * @param file Handle The file handle to close, defaults to the current output file.
     */
    function close(file?: FileHandle): void;

    /**
     * Flushes the current output file.
     */
    function flush(): void;

    /**
     * Get or set the current input file.
     * @param file The new input file, either as a file path or pre-existing handle.
     * @returns The current input file.
     */
    function input(file?: FileHandle | string): FileHandle;

    /**
     * Opens the given file name in read mode and returns an iterator that, each time it is called, returns a new line from the file.
     * This can be used in a for loop to iterate over all lines of a file
     * Once the end of the file has been reached, nil will be returned. The file is automatically closed.
     * If no file name is given, the current input will be used instead. In this case, the handle is not used.
     *
     * @param filename The name of the file to extract lines from
     * @param ...  The argument to pass to Handle:read for each line.
     * @returns The line iterator.
     */

    function lines(
      filename?: string,
      ...args: any[]
    ): LuaIterable<string | null>;

    /**
     * Open a file with the given mode, either returning a new file handle or nil, plus an error message.
     * @param filename The name of the file to open.
     * @param mode The mode to open the file with. This defaults to r.
     */
    function open(filename: string, mode?: ReadMode): FileHandle;

    /**
     * Get or set the current output file.
     * @param file The new output file, either as a file path or pre-existing handle.
     * @returns The current output file.
     */
    function output(file?: FileHandle | string): FileHandle;

    /**
     * Read from the currently opened input file.
     * This is equivalent to io.input():read(...). See the documentation there for full details.
     * @param ... The formats to read, defaulting to a whole line.
     * @returns The data read, or nil if nothing can be read.
     */
    function read(...fmt: string[]): LuaMultiReturn<(string | null)[]>;

    /**
     * Checks whether handle is a given file handle, and determine if it is open or not.
     * @param obj The value to check
     * @returns "file" if this is an open file, "closed file" if it is a closed file handle, or nil if not a file handle.
     */
    function type(obj: any): string | null;

    /**
     * Write to the currently opened output file.
     * @param str The strings to write
     */
    function write(...str: string[]): void;
  }

  /**
   * A simple way to run several functions at once.
   */
  namespace parallel {
    function waitForAny(...functions: ((...args: any) => any)[]): void;
    function waitForAll(...functions: ((...args: any) => any)[]): void;
  }

  /**
   * Colors API
   * Constants and functions for colour values, suitable for working with term and redstone.
   */
  namespace colors {
    const white: number;
    const orange: number;
    const magenta: number;
    const lightBlue: number;
    const yellow: number;
    const lime: number;
    const pink: number;
    const gray: number;
    const lightGray: number;
    const cyan: number;
    const purple: number;
    const blue: number;
    const brown: number;
    const green: number;
    const red: number;
    const black: number;

    /**
     * Combines multiple colors into a single value, suitable for functions like term.setBackgroundColor.
     * @param colors The colors to combine
     * @returns The combined colors
     */
    function combine(...colors: number[]): number;

    /**
     * Removes specific colors from a color.
     * @param colors The color to subtract from
     * @param colors The colors to subtract
     * @returns The resulting color
     */
    function subtract(color: number, ...colors: number[]): number;

    /**
     * Tests if the given color contains another color.
     * @param color The color to test
     * @param testColor The color to test for
     * @returns If color contains testColor
     */
    function test(color: number, testColor: number): boolean;

    /**
     * Converts the given color to an RGB value.
     * @param r The red channel (0-1)
     * @param g The green channel (0-1)
     * @param b The blue channel (0-1)
     * @returns The packed RGB value
     */
    function packRGB(r: number, g: number, b: number): number;

    /**
     * Converts the given RGB color to a color value.
     * @param rgb The RGB value to convert
     * @returns The separated red, green and blue channels
     */
    function unpackRGB(rgb: number): [number, number, number];

    /**
     * Either calls colors.packRGB or colors.unpackRGB, depending on how many arguments it receives.
     */
    function rgb8(...args: number[]): number | [number, number, number];

    /**
     * Converts the given color to a paint/blit hex character (0-9a-f).
     * @param color The color to convert
     * @returns The blit character
     */
    function toBlit(color: number): string;

    /**
     * Converts the given paint/blit hex character (0-9a-f) to a color.
     * @param hex The blit character to convert
     * @returns The color
     */
    function fromBlit(hex: string): number;
  }

  /**
   * British spelling variant of colors
   */
  namespace colours {
    const white: number;
    const orange: number;
    const magenta: number;
    const lightBlue: number;
    const yellow: number;
    const lime: number;
    const pink: number;
    const grey: number;
    const lightGrey: number;
    const cyan: number;
    const purple: number;
    const blue: number;
    const brown: number;
    const green: number;
    const red: number;
    const black: number;

    function combine(...colours: number[]): number;
    function subtract(colour: number, ...colours: number[]): number;
    function test(colour: number, testColour: number): boolean;
    function packRGB(r: number, g: number, b: number): number;
    function unpackRGB(rgb: number): [number, number, number];
    function rgb8(...args: number[]): number | [number, number, number];
    function toBlit(colour: number): string;
    function fromBlit(hex: string): number;
  }

  /**
   * Rednet API
   * Interact with the rednet API, high level networking system over modem API.
   */
  namespace rednet {
    const CHANNEL_BROADCAST = 65535;
    const CHANNEL_REPEAT = 65533;
    const MAX_ID_CHANNEL = 65500;

    type RednetData = number | boolean | string | any;

    /**
     * Opens a modem with the given peripheral name, allowing it to send and receive messages over rednet.
     * This will open the modem on two channels: one which has the same ID as the computer, and another on the broadcast channel.
     * @param modem string The name of the modem to open.
     */
    function open(modem: string): void;

    /**
     * Close a modem with the given peripheral name, meaning it can no longer send and receive rednet messages.
     * @param modem The side the modem exists on. If not given, all open modems will be closed.
     */
    function close(modem?: string): void;

    /**
     * Determine if rednet is currently open.
     * @param modem Which modem to check. If not given, all connected modems will be checked.
     */
    function isOpen(modem?: string): boolean;

    /**
     * Allows a computer or turtle with an attached modem to send a message intended for a computer with a specific ID. At least one such modem must first be opened before sending is possible.
     *
     * Assuming the target was in range and also had a correctly opened modem, the target computer may then use rednet.receive to collect the message.
     * @param recipient The ID of the receiving computer.
     * @param message  The message to send. Like with modem.transmit, this can contain any primitive type (numbers, booleans and strings) as well as tables. Other types (like functions), as well as metatables, will not be transmitted.
     * @param protocol string The "protocol" to send this message under. When using rednet.receive one can filter to only receive messages sent under a particular protocol.
     * @returns If this message was successfully sent (i.e. if rednet is currently open). Note, this does not guarantee the message was actually received.
     */
    function send(
      recipient: number,
      message: RednetData,
      protocol?: string,
    ): boolean;

    /**
     * Broadcasts a string message over the predefined CHANNEL_BROADCAST channel. The message will be received by every device listening to rednet.
     * @param message The message to send. This should not contain coroutines or functions, as they will be converted to nil.
     * @param protocol The "protocol" to send this message under. When using rednet.receive one can filter to only receive messages sent under a particular protocol.
     */
    function broadcast(message: RednetData, protocol?: string): void;

    /**
     * Wait for a rednet message to be received, or until nTimeout seconds have elapsed.
     * @param protocolFilter The protocol the received message must be sent with. If specified, any messages not sent under this protocol will be discarded.
     * @param timeout The number of seconds to wait if no message is received.
     * @returns
     *  - 1. The computer which sent this message
     *  - 2. The received message
     *  - 3. The protocol this message was sent under.
     *  - or null If the timeout elapsed and no message was received.
     */
    function receive(
      protocolFilter?: string,
      timeout?: number,
    ): LuaMultiReturn<[number, RednetData, string | null]>;

    /**
     * Register the system as "hosting" the desired protocol under the specified name. If a rednet lookup is performed for that protocol (and maybe name) on the same network, the registered system will automatically respond via a background process, hence providing the system performing the lookup with its ID number.
     *
     * Multiple computers may not register themselves on the same network as having the same names against the same protocols, and the title localhost is specifically reserved. They may, however, share names as long as their hosted protocols are different, or if they only join a given network after "registering" themselves before doing so (eg while offline or part of a different network).
     *
     * @param protocol The protocol this computer provides.
     * @param hostname The name this computer exposes for the given protocol.
     */
    function host(protocol: string, hostname: string): void;

    /**
     * Stop hosting a specific protocol, meaning it will no longer respond to rednet.lookup requests.
     * @param protocol The protocol to unregister your self from.
     */
    function unhost(protocol: string): void;

    /**
     * Search the local rednet network for systems hosting the desired protocol and returns any computer IDs that respond as "registered" against it.
     *
     * If a hostname is specified, only one ID will be returned (assuming an exact match is found).
     *
     * @param protocol The protocol to search for.
     * @param hostname The hostname to search for.
     * @returns A list of computer IDs hosting the given protocol.
     *  - or The computer ID with the provided hostname and protocol, or nil if none exists.
     */
    function lookup(
      protocol: string,
      hostname?: string,
    ): number[] | number | null;
  }

  /**
   * File System API
   * Interact with the computer's files and filesystem, allowing you to manipulate files, directories and paths.
   */
  /** @noSelf **/
  namespace fs {
    /**
     * Returns a list of all the files (including subdirectories but not their contents) contained in a directory.
     * @param path The path to list
     * @returns A table with a list of files in the directory
     */
    function list(path: string): string[];

    /**
     * Checks if a path exists and is a file.
     * @param path The path to check
     * @returns If the path exists and is a file
     */
    function exists(path: string): boolean;

    /**
     * Checks if a path exists and is a directory.
     * @param path The path to check
     * @returns If the path exists and is a directory
     */
    function isDir(path: string): boolean;

    /**
     * Checks if a path is read-only.
     * @param path The path to check
     * @returns If the path cannot be written to
     */
    function isReadOnly(path: string): boolean;

    /**
     * Gets the file size of the specified file.
     * @param path The path to check
     * @returns The file size in bytes
     */
    function getSize(path: string): number;

    /**
     * Gets the free space on the drive containing the specified path.
     * @param path The path to check
     * @returns The free space in bytes
     */
    function getFreeSpace(path: string): number;

    /**
     * Makes a directory at the specified path.
     * @param path The path to create the directory at
     */
    function makeDir(path: string): void;

    /**
     * Moves a file or directory from one path to another.
     * @param fromPath The path to move from
     * @param toPath The path to move to
     */
    function move(fromPath: string, toPath: string): void;

    /**
     * Copies a file or directory from one path to another.
     * @param fromPath The path to copy from
     * @param toPath The path to copy to
     */
    function copy(fromPath: string, toPath: string): void;

    /**
     * Deletes a file or directory.
     * @param path The path to delete
     * @remarks This maps to the Lua 'delete' function, renamed in TypeScript due to reserved word constraints
     */
    function deleteFile(path: string): void;

    /**
     * Combines two path components, returning a path consisting of the local path nested inside the base path.
     * @param basePath The base path
     * @param localPath The path to append
     * @returns The combined path
     */
    function combine(basePath: string, localPath: string): string;

    /**
     * Gets the file name component of a path.
     * @param path The path to get the name from
     * @returns The name
     */
    function getName(path: string): string;

    /**
     * Gets the directory component of a path.
     * @param path The path to get the directory from
     * @returns The directory
     */
    function getDir(path: string): string;

    /**
     * Opens a file for reading or writing.
     * @param path The path to the file to open
     * @param mode The mode to open the file with
     * @returns The file handle
     */
    function open(
      path: string,
      mode: "r" | "w" | "a" | "rb" | "wb" | "ab",
    ): FileHandle;

    /**
     * Searches for files matching a string with wildcards.
     * @param pattern The pattern to match
     * @returns A list of matching files
     */
    function find(pattern: string): string[];

    /**
     * Returns the capacity of the drive containing the specified path.
     * @param path The path to check
     * @returns The capacity in bytes
     */
    function getCapacity(path: string): number;

    /**
     * Returns the drive label for the specified path.
     * @param path The path to get the label for
     * @returns The label
     */
    function getDrive(path: string): string;

    /**
     * Gets the attributes of a file or folder.
     * @param path The path to get attributes for
     * @returns A table of attributes
     */
    function attributes(path: string): {
      size: number;
      isDir: boolean;
      isReadOnly: boolean;
      created: number;
      modified: number;
    };
  }

  /**
   * File handle interface
   */
  interface FileHandle {
    /**
     * @noSelf
     * Closes an open file.
     */
    close(): void;

    /**
     * @noSelf
     * Reads data from an open file.
     * @param count The number of bytes or characters to read
     * @returns The read data
     */
    read(count?: number): string | number[] | null;

    /**
     * @noSelf
     * Reads a line from an open file.
     * @returns The read line
     */
    readLine(): string | null;

    /**
     * @noSelf
     * Reads all remaining contents from an open file.
     * @returns The file contents
     */
    readAll(): string | null;

    /**
     * @noSelf
     * Writes data to an open file.
     * @param data The data to write
     */
    write(data: string | number[]): void;

    /**
     * @noSelf
     * Writes a line to an open file.
     * @param data The line to write
     */
    writeLine(data: string): void;

    /**
     * @noSelf
     * Flushes any buffered data to the file.
     */
    flush(): void;

    /**
     * @noSelf
     * Seeks to a new position in the file.
     * @param whence Where to seek from
     * @param offset The offset to seek to
     * @returns The new position
     */
    seek(whence: "set" | "cur" | "end", offset?: number): number;
  }

  /**
   * HTTP API
   * Make HTTP requests, sending and receiving data to a remote web server.
   */
  namespace http {
    /**
     * Makes a HTTP request to the specified URL.
     * @param url The URL to make the request to
     * @param body An optional string containing the body of the request
     * @param headers An optional table of additional HTTP headers
     * @returns A handle to the ongoing request
     */
    function request(
      url: string,
      body?: string,
      headers?: Record<string, string>,
    ): HTTPRequest;

    /**
     * Makes a HTTP GET request to the specified URL.
     * @param url The URL to make the request to
     * @param headers An optional table of additional HTTP headers
     * @returns The contents of the page or nil if the request failed
     */
    function get(
      url: string,
      headers?: Record<string, string>,
    ): Promise<HTTPResponse>;

    /**
     * Makes a HTTP POST request to the specified URL.
     * @param url The URL to make the request to
     * @param body The body of the POST request
     * @param headers An optional table of additional HTTP headers
     * @returns The contents of the page or nil if the request failed
     */
    function post(
      url: string,
      body: string,
      headers?: Record<string, string>,
    ): Promise<HTTPResponse>;

    /**
     * Checks if a URL is allowed by the config.
     * @param url The URL to check
     * @returns If the URL is allowed
     */
    function checkURL(url: string): boolean;

    /**
     * Opens a websocket.
     * @param url The URL to connect to
     * @param headers An optional table of additional HTTP headers
     * @returns A websocket handle
     */
    function websocket(
      url: string,
      headers?: Record<string, string>,
    ): Promise<Websocket>;
  }

  /**
   * HTTP Request interface
   */
  interface HTTPRequest {
    /**
     * Get the response to this request.
     * @returns The response, or nil if the request errored
     */
    getResponse(): Promise<HTTPResponse>;

    /**
     * Cancels this request.
     */
    cancel(): void;
  }

  /**
   * HTTP Response interface
   */
  interface HTTPResponse {
    /**
     * Get the response code.
     * @returns The response code
     */
    getResponseCode(): number;

    /**
     * Get a response header.
     * @param header The header to get
     * @returns The header value
     */
    getResponseHeader(header: string): string | null;

    /**
     * Get all response headers.
     * @returns A table of headers
     */
    getResponseHeaders(): Record<string, string>;

    /**
     * Read part of the response.
     * @param count The number of bytes to read
     * @returns The read bytes
     */
    read(count?: number): string | null;

    /**
     * Read the entire response.
     * @returns The response body
     */
    readAll(): string | null;

    /**
     * Close this response.
     */
    close(): void;
  }

  /**
   * Websocket interface
   */
  interface Websocket {
    /**
     * Send a message through the websocket.
     * @param message The message to send
     */
    send(message: string): void;

    /**
     * Receive a message from the websocket.
     * @param timeout The timeout in seconds
     * @returns The received message
     */
    receive(timeout?: number): string | null;

    /**
     * Close this websocket.
     */
    close(): void;
  }

  /**
   * Terminal API
   * Interact with a computer's terminal or monitors, writing text and drawing ASCII graphics.
   */
  namespace term {
    /**
     * Writes text at the current cursor position, moving the cursor to the end of the text.
     * @param text The text to write
     */
    function write(text: string): void;

    /**
     * Moves the cursor to the specified position.
     * @param x The x position to move to
     * @param y The y position to move to
     */
    function setCursorPos(x: number, y: number): void;

    /**
     * Gets the position of the cursor.
     * @returns The x and y position of the cursor
     */
    function getCursorPos(): [number, number];

    /**
     * Checks if the cursor is currently blinking.
     * @returns If the cursor is blinking
     */
    function getCursorBlink(): boolean;

    /**
     * Sets whether the cursor should be visible (and blinking).
     * @param blink If the cursor should blink
     */
    function setCursorBlink(blink: boolean): void;

    /**
     * Gets the size of the terminal.
     * @returns The terminal size
     */
    function getSize(): [number, number];

    /**
     * Clears the terminal, filling it with the current background color.
     */
    function clear(): void;

    /**
     * Clears the line the cursor is currently on, filling it with the current background color.
     */
    function clearLine(): void;

    /**
     * Returns the current background color.
     * @returns The current background color
     */
    function getBackgroundColor(): number;

    /**
     * Returns the current text color.
     * @returns The current text color
     */
    function getTextColor(): number;

    /**
     * Sets the background color for future text operations.
     * @param color The color to set
     */
    function setBackgroundColor(color: number): void;

    /**
     * Sets the text color for future text operations.
     * @param color The color to set
     */
    function setTextColor(color: number): void;

    /**
     * Checks if this terminal supports color.
     * @returns If this terminal supports color
     */
    function isColor(): boolean;

    /**
     * British spelling variant of isColor.
     * @returns If this terminal supports colour
     */
    function isColour(): boolean;

    /**
     * Writes text to the terminal with the specified text and background colors.
     * @param text The text to write
     * @param textColor The color for the text
     * @param backgroundColor The color for the background
     */
    function blit(
      text: string,
      textColor: string,
      backgroundColor: string,
    ): void;

    /**
     * Scrolls the terminal by the specified number of lines.
     * @param lines The number of lines to scroll
     */
    function scroll(lines: number): void;

    /**
     * Gets the current palette color for the specified color.
     * @param color The color to get
     * @returns The palette color as RGB values
     */
    function getPaletteColor(color: number): [number, number, number];

    /**
     * British spelling variant of getPaletteColor.
     * @param colour The colour to get
     * @returns The palette colour as RGB values
     */
    function getPaletteColour(colour: number): [number, number, number];

    /**
     * Sets the palette color for the specified color.
     * @param color The color to set
     * @param r The red channel (0-1)
     * @param g The green channel (0-1)
     * @param b The blue channel (0-1)
     */
    function setPaletteColor(
      color: number,
      r: number,
      g: number,
      b: number,
    ): void;

    /**
     * British spelling variant of setPaletteColor.
     * @param colour The colour to set
     * @param r The red channel (0-1)
     * @param g The green channel (0-1)
     * @param b The blue channel (0-1)
     */
    function setPaletteColour(
      colour: number,
      r: number,
      g: number,
      b: number,
    ): void;

    /**
     * Redirects terminal output to a monitor, a window, or any other custom terminal object.
     * @param target The new terminal object
     * @returns The previous terminal object
     */
    function redirect(target: any): any;

    /**
     * Gets the current terminal object.
     * @returns The current terminal object
     */
    function current(): any;

    /**
     * Gets the native terminal object.
     * @returns The native terminal object
     */
    function native(): any;
  }

  /**
   * Turtle API
   * Turtles are a robotic device, which can break and place blocks, attack mobs, and move about the world.
   */
  namespace turtle {
    /**
     * Moves the turtle forward one block.
     * @returns Whether the turtle moved successfully
     */
    function forward(): [boolean, string?];

    /**
     * Moves the turtle backward one block.
     * @returns Whether the turtle moved successfully
     */
    function back(): [boolean, string?];

    /**
     * Moves the turtle up one block.
     * @returns Whether the turtle moved successfully
     */
    function up(): [boolean, string?];

    /**
     * Moves the turtle down one block.
     * @returns Whether the turtle moved successfully
     */
    function down(): [boolean, string?];

    /**
     * Turns the turtle 90 degrees to the left.
     * @returns Whether the turtle turned successfully
     */
    function turnLeft(): [boolean, string?];

    /**
     * Turns the turtle 90 degrees to the right.
     * @returns Whether the turtle turned successfully
     */
    function turnRight(): [boolean, string?];

    /**
     * Attempts to break the block in front of the turtle.
     * @returns Whether the turtle broke a block
     */
    function dig(): [boolean, string?];

    /**
     * Attempts to break the block above the turtle.
     * @returns Whether the turtle broke a block
     */
    function digUp(): [boolean, string?];

    /**
     * Attempts to break the block below the turtle.
     * @returns Whether the turtle broke a block
     */
    function digDown(): [boolean, string?];

    /**
     * Places a block or item into the world in front of the turtle.
     * @param text An optional string to place on a sign
     * @returns Whether the turtle placed a block
     */
    function place(text?: string): [boolean, string?];

    /**
     * Places a block or item into the world above the turtle.
     * @param text An optional string to place on a sign
     * @returns Whether the turtle placed a block
     */
    function placeUp(text?: string): [boolean, string?];

    /**
     * Places a block or item into the world below the turtle.
     * @param text An optional string to place on a sign
     * @returns Whether the turtle placed a block
     */
    function placeDown(text?: string): [boolean, string?];

    /**
     * Detects if there is a block in front of the turtle.
     * @returns Whether there is a block in front
     */
    function detect(): boolean;

    /**
     * Detects if there is a block above the turtle.
     * @returns Whether there is a block above
     */
    function detectUp(): boolean;

    /**
     * Detects if there is a block below the turtle.
     * @returns Whether there is a block below
     */
    function detectDown(): boolean;

    /**
     * Compares the block in front of the turtle with the item in the currently selected slot.
     * @returns Whether the block and item are the same
     */
    function compare(): boolean;

    /**
     * Compares the block above the turtle with the item in the currently selected slot.
     * @returns Whether the block and item are the same
     */
    function compareUp(): boolean;

    /**
     * Compares the block below the turtle with the item in the currently selected slot.
     * @returns Whether the block and item are the same
     */
    function compareDown(): boolean;

    /**
     * Attacks the entity in front of the turtle.
     * @returns Whether the turtle attacked an entity
     */
    function attack(): [boolean, string?];

    /**
     * Attacks the entity above the turtle.
     * @returns Whether the turtle attacked an entity
     */
    function attackUp(): [boolean, string?];

    /**
     * Attacks the entity below the turtle.
     * @returns Whether the turtle attacked an entity
     */
    function attackDown(): [boolean, string?];

    /**
     * Sucks an item from the inventory in front of the turtle.
     * @param count The number of items to suck
     * @returns Whether the turtle sucked an item
     */
    function suck(count?: number): [boolean, string?];

    /**
     * Sucks an item from the inventory above the turtle.
     * @param count The number of items to suck
     * @returns Whether the turtle sucked an item
     */
    function suckUp(count?: number): [boolean, string?];

    /**
     * Sucks an item from the inventory below the turtle.
     * @param count The number of items to suck
     * @returns Whether the turtle sucked an item
     */
    function suckDown(count?: number): [boolean, string?];

    /**
     * Gets the currently selected slot.
     * @returns The selected slot
     */
    function getSelectedSlot(): number;

    /**
     * Sets the currently selected slot.
     * @param slot The slot to select
     */
    function select(slot: number): boolean;

    /**
     * Gets the number of items in the specified slot.
     * @param slot The slot to check
     * @returns The number of items in the slot
     */
    function getItemCount(slot?: number): number;

    /**
     * Gets the remaining number of items that can be stored in this stack.
     * @param slot The slot to check
     * @returns The space left in this slot
     */
    function getItemSpace(slot?: number): number;

    /**
     * Gets the details about the item in the specified slot.
     * @param slot The slot to check
     * @returns The item details
     */
    function getItemDetail(slot?: number): {
      name: string;
      count: number;
      damage?: number;
      nbt?: any;
    } | null;

    /**
     * Transfers items from the selected slot to another one.
     * @param slot The slot to transfer to
     * @param count The number of items to transfer
     * @returns Whether items were transferred
     */
    function transferTo(slot: number, count?: number): boolean;

    /**
     * Gets the turtle's fuel level.
     * @returns The fuel level, or "unlimited" if fuel is disabled
     */
    function getFuelLevel(): number | "unlimited";

    /**
     * Gets the maximum fuel level of this turtle.
     * @returns The maximum fuel level, or "unlimited" if fuel is disabled
     */
    function getFuelLimit(): number | "unlimited";

    /**
     * Refuels this turtle.
     * @param count The number of items to consume
     * @returns Whether the turtle was refueled
     */
    function refuel(count?: number): [boolean, string?];

    /**
     * Checks if the turtle can be refueled with the item in the currently selected slot.
     * @returns Whether the item is fuel
     */
    function isFuel(): boolean;

    /**
     * Checks if the turtle can be equipped with the item in the currently selected slot.
     * @returns Whether the item is a valid upgrade
     */
    function isEquipped(): boolean;

    /**
     * Equips the item in the currently selected slot to the left side of the turtle.
     * @returns Whether the item was equipped
     */
    function equipLeft(): [boolean, string?];

    /**
     * Equips the item in the currently selected slot to the right side of the turtle.
     * @returns Whether the item was equipped
     */
    function equipRight(): [boolean, string?];

    /**
     * Gets the name of the currently equipped upgrade on the left side of the turtle.
     * @returns The name of the upgrade
     */
    function getEquipmentLeft(): string | null;

    /**
     * Gets the name of the currently equipped upgrade on the right side of the turtle.
     * @returns The name of the upgrade
     */
    function getEquipmentRight(): string | null;

    /**
     * Crafts items using the recipe in the turtle's inventory.
     * @param limit The maximum number of crafting operations to perform
     * @returns Whether the turtle crafted items
     */
    function craft(limit?: number): [boolean, string?];
  }

  /**
   * Peripheral API
   * Find and control peripherals attached to this computer.
   */
  namespace peripheral {
    /**
     * Determines if the peripheral with the given name exists.
     * @param name The name of the peripheral to find
     * @returns If a peripheral exists with the given name
     */
    function isPresent(name: string): boolean;

    /**
     * Gets the types of a named peripheral.
     * @param name The name of the peripheral to find
     * @returns The peripheral's types, or nil if it doesn't exist
     */
    function getType(name: string): string[] | null;

    /**
     * Checks if a peripheral is of a particular type.
     * @param name The name of the peripheral to find
     * @param peripheralType The type to check
     * @returns If a peripheral has a specific type
     */
    function hasType(name: string, peripheralType: string): boolean;

    /**
     * Gets all available methods for the peripheral with the given name.
     * @param name The name of the peripheral to find
     * @returns The methods for this peripheral, or nil if it doesn't exist
     */
    function getMethods(name: string): string[] | null;

    /**
     * Calls a method on a peripheral with the given name.
     * @param name The name of the peripheral to invoke the method on
     * @param method The name of the method to invoke
     * @param args Additional arguments to pass to the method
     * @returns The return values of the peripheral method
     */
    function call<T extends any[]>(
      name: string,
      method: string,
      ...args: any[]
    ): T;

    /**
     * Gets a table containing all functions available on a peripheral.
     * @param name The name of the peripheral to wrap
     * @returns The wrapped peripheral, or nil if it doesn't exist
     */
    function wrap(name: string): any | null;

    /**
     * Finds all peripherals of a specific type.
     * @param peripheralType The type to search for
     * @returns The names of found peripherals and the wrapped peripherals
     */
    function find(
      peripheralType: string,
      filter?: (name: string, wrapped?: any) => boolean | void,
    ): [string, any][];

    /**
     * Gets the names of all attached peripherals.
     * @returns The names of all peripherals
     */
    function getNames(): string[];
  }

  /**
   * Redstone API
   * Get and set redstone signals adjacent to this computer.
   */
  namespace redstone {
    /**
     * Returns a table containing the six sides of the computer. Namely, "top", "bottom", "left", "right", "front" and "back".
     * @returns A table of valid sides.
     */
    function getSides(): string[];

    /**
     * Gets the current redstone output on a specific side.
     * @param side The side to get
     * @returns If redstone is being output on this side
     */
    function getOutput(side: string): boolean;

    /**
     * Sets the current redstone output on a specific side.
     * @param side The side to set
     * @param value The power level to set
     */
    function setOutput(side: string, value: boolean): void;

    /**
     * Gets the current redstone input on a specific side.
     * @param side The side to get
     * @returns If redstone input is available on this side
     */
    function getInput(side: string): boolean;

    /**
     * Gets the current analog redstone output on a specific side.
     * @param side The side to get
     * @returns The analog signal being output (0-15)
     */
    function getAnalogOutput(side: string): number;

    /**
     * Sets the current analog redstone output on a specific side.
     * @param side The side to set
     * @param value The power level to set (0-15)
     */
    function setAnalogOutput(side: string, value: number): void;

    /**
     * Gets the current analog redstone input on a specific side.
     * @param side The side to get
     * @returns The analog signal being input (0-15)
     */
    function getAnalogInput(side: string): number;

    /**
     * Gets the current bundled redstone output on a specific side.
     * @param side The side to get
     * @returns The bundled signal being output
     */
    function getBundledOutput(side: string): number;

    /**
     * Sets the current bundled redstone output on a specific side.
     * @param side The side to set
     * @param value The power level to set
     */
    function setBundledOutput(side: string, value: number): void;

    /**
     * Gets the current bundled redstone input on a specific side.
     * @param side The side to get
     * @returns The bundled signal being input
     */
    function getBundledInput(side: string): number;

    /**
     * Tests if a specific redstone channel is on on a specific side.
     * @param side The side to test
     * @param color The color to test
     * @returns If this color is on
     */
    function testBundledInput(side: string, color: number): boolean;
  }

  /**
   * OS API
   * The os API allows interacting with the current computer.
   */
  namespace os {
    /**
     * Returns the current computer's ID.
     * @returns The computer's ID
     */
    function getComputerID(): number;

    /**
     * Returns the current computer's label.
     * @returns The computer's label
     */
    function getComputerLabel(): string | null;

    /**
     * Sets the current computer's label.
     * @param label The new label
     */
    function setComputerLabel(label: string | null): void;

    /**
     * Shuts down the computer immediately.
     */
    function shutdown(): never;

    /**
     * Reboots the computer immediately.
     */
    function reboot(): never;

    /**
     * Returns the number of seconds that the computer has been running.
     * @returns The computer's uptime
     */
    function clock(): number;

    /**
     * Returns the current time depending on the string passed in.
     * @param locale The locale to use
     * @returns The current time
     */
    function time(locale?: string): number;

    /**
     * Pauses execution for the specified number of seconds.
     * @param time The number of seconds to sleep for, rounded up to the nearest multiple of 0.05.
     */
    export function sleep(time: number): void;

    /**
     * Returns the day depending on the string passed in.
     * @param locale The locale to use
     * @returns The current day
     */
    function day(locale?: string): number;

    /**
     * Returns the number of milliseconds since an epoch depending on the locale.
     * @param locale The locale to use
     * @returns The current epoch time
     */
    function epoch(locale?: string): number;

    /**
     * Adds an event to be processed after the specified amount of time.
     * @param time The time in seconds to wait before firing the timer
     * @returns A number identifying the timer that was started
     */
    function startTimer(time: number): number;

    /**
     * Adds an event to be processed after the specified amount of time.
     * @param time The time in seconds to wait before firing the alarm
     * @returns A number identifying the alarm that was started
     */
    function setAlarm(time: number): number;

    /**
     * Cancels a timer or alarm started with startTimer or setAlarm.
     * @param token The timer or alarm to cancel
     */
    function cancelTimer(token: number): void;

    /**
     * Cancels a timer or alarm started with startTimer or setAlarm.
     * @param token The timer or alarm to cancel
     */
    function cancelAlarm(token: number): void;

    /**
     * Pulls an event from the event queue, or waits for one if no events are available.
     * @param filter A filter for allowed event types
     * @param timeout The maximum time to wait
     * @returns The event name and additional parameters
     */
    function pullEvent(filter?: string, timeout?: number): [string, ...any[]];

    /**
     * Pulls an event from the event queue, or waits for one if no events are available.
     * Unlike pullEvent, this does not terminate if a "terminate" event is pulled.
     * @param filter A filter for allowed event types
     * @param timeout The maximum time to wait
     * @returns The event name and additional parameters
     */
    function pullEventRaw(
      filter?: string,
      timeout?: number,
    ): [string, ...any[]];

    /**
     * Registers a new event listener and runs the function when the event is fired.
     * @param event The event to listen for
     * @param callback The function to call when the event is fired
     */
    function registerEventListener(
      event: string,
      callback: (...args: any[]) => void,
    ): void;

    /**
     * Queues a new event to be processed by the computer.
     * @param event The event to queue
     * @param args Additional arguments to pass to the event
     */
    function queueEvent(event: string, ...args: any[]): void;
  }

  // Additional APIs would be added here...
}
